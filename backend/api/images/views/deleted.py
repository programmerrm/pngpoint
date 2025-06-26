from rest_framework import status, viewsets
from rest_framework.response import Response
from permissions.or_permission import IsRegularOrAdminUser
from images.models import Images
from images.services.cloudflare import NUMBER_OF_IMAGE_DELETE_FROM_CLOUDFLARE, SINGLE_IMAGE_DELETE_FROM_CLOUDFLARE, DELETE_ALL_IMAGE_FROM_CLOUDFLARE

class SingleImageDeleteView(viewsets.ViewSet):
    permission_classes = [IsRegularOrAdminUser]

    def destroy(self, request, pk=None):
        try:
            image = Images.objects.get(pk=pk)
            cloudflare_id = image.image_id
            result = SINGLE_IMAGE_DELETE_FROM_CLOUDFLARE(cloudflare_id)
            if not result.get('success'):
                return Response({
                    'success': False,
                    'error': 'Cloudflare deletion failed', 
                    'details': result.get('error')
                }, status=status.HTTP_400_BAD_REQUEST)
            image.delete()
            return Response({
                'success': True, 
                'message': 'Image deleted from DB and Cloudflare.'
            }, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Internal server error',
                'errors': f'An error occurred: {str(e)}.',
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class NumberOfImageDeleteView(viewsets.ViewSet):
    permission_classes = [IsRegularOrAdminUser]
    
    def destroy(self, request, pk=None):
        image_ids = request.data.get("image_ids", [])
        if not isinstance(image_ids, list) or not image_ids:
            return Response({
                'error': 'Provide a list of image IDs.',
            }, status=status.HTTP_400_BAD_REQUEST)
        
        deleted = []
        failed = []

        for image_id in image_ids:
            try:
                image = Images.objects.get(pk=image_id)
                result = NUMBER_OF_IMAGE_DELETE_FROM_CLOUDFLARE(image.image_id)

                if result.get('success'):
                    image.delete()
                    deleted.append(image_id)
                else:
                    failed.append({'id': image_id, 'error': result.get('error')})
            except Images.DoesNotExist:
                failed.append({'id': image_id, 'error': 'Not found'})
            except Exception as e:
                failed.append({'id': image_id, 'error': str(e)})

        return Response({
            'success': True,
            'deleted': deleted,
            'failed': failed,
        }, status=status.HTTP_200_OK)

class ALLImageDeleteView(viewsets.ViewSet):
    permission_classes = [IsRegularOrAdminUser]

    def destroy(self, request, pk=None):
        try:
            result = DELETE_ALL_IMAGE_FROM_CLOUDFLARE()
            if not result.get('success'):
                return Response({
                    'error': 'Failed to delete Cloudflare images', 
                    'details': result.get('error')
                }, status=status.HTTP_400_BAD_REQUEST)

            Images.objects.all().delete()

            return Response({
                'success': True,
                'cloudflare_deleted': result.get('deleted', []),
                'cloudflare_failed': result.get('failed', [])
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
