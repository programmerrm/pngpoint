import json
import logging
from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from images.models import Images, ImageKeywords
from images.serializers import ImagesSerializer
from images.services import UPLOAD_IMAGE_TO_CLOUDFLARE, GET_IMAGE_URL_FROM_CLOUDFLARE, DELETE_ALL_IMAGE_FROM_CLOUDFLARE, NUMBER_OF_IMAGE_DELETE_FROM_CLOUDFLARE

logger = logging.getLogger(__name__)

class ImagesUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        image_files = request.FILES.getlist('images')

        if not image_files:
            return Response({
                'success': False,
                'message': 'No images uploaded.',
            }, status=status.HTTP_400_BAD_REQUEST)

        title = request.data.getlist("title")
        description = request.data.getlist("description")
        keywords = request.data.getlist("keywords")

        uploaded_images = []

        for idx, image_file in enumerate(image_files):
            try:
                image_id = UPLOAD_IMAGE_TO_CLOUDFLARE(image_file)
                image_url = GET_IMAGE_URL_FROM_CLOUDFLARE(image_id)

                image_obj = Images.objects.create(
                    user=request.user,
                    image_id=image_id,
                    url=image_url,
                    title=title[idx] if idx < len(title) else '',
                    description=description[idx] if idx < len(description) else '',
                    status='approved' if request.user.role == 'admin' else 'pending',
                    category=request.data.get("category", "")
                )

                if idx < len(keywords):
                    keyword_input = keywords[idx].strip()
                    if keyword_input:
                        try:
                            parsed_keywords = json.loads(keyword_input)
                            if not isinstance(parsed_keywords, list):
                                parsed_keywords = [str(parsed_keywords)]
                        except json.JSONDecodeError:
                            parsed_keywords = [kw.strip() for kw in keyword_input.split(",") if kw.strip()]

                        for keyword in parsed_keywords:
                            ImageKeywords.objects.create(
                                image=image_obj,
                                name=keyword
                            )

                uploaded_images.append(ImagesSerializer(image_obj).data)

            except Exception as e:
                logger.error("Upload failed for %s: %s", image_file.name, e)

        if not uploaded_images:
            return Response({
                'success': False,
                'message': 'Upload failed.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            'success': True,
            'message': f'{len(uploaded_images)} images upload successfully',
            'images': uploaded_images,
        }, status=status.HTTP_201_CREATED)
    
class ImagesUpdatedView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]

    def patch(self, request, image_id, *args, **kwargs):
        try:
            image = Images.objects.get(id=image_id)
        except Images.DoesNotExist:
            return Response({
                'success': False,
                'error': 'Image not found or permission denied.'
            }, status=status.HTTP_404_NOT_FOUND)

        updatable_fields = ['title', 'description', 'category', 'status']
        data = {field: request.data[field] for field in updatable_fields if field in request.data}

        serializer = ImagesSerializer(image, data=data, partial=True)
        if not serializer.is_valid():
            return Response({
                'success': False, 
                'error': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        keywords = request.data.get('keywords')
        if keywords is not None:
            if isinstance(keywords, str):
                try:
                    keywords = json.loads(keywords)
                except json.JSONDecodeError:
                    return Response({
                        'success': False, 
                        'error': 'Invalid keywords JSON format.'
                    }, status=status.HTTP_400_BAD_REQUEST)

            if isinstance(keywords, list):
                with transaction.atomic():
                    new_keyword_names = set(kw['name'].strip() for kw in keywords if 'name' in kw and kw['name'].strip())

                    existing_keywords = ImageKeywords.objects.filter(image=image)
                    existing_keyword_names = set(kw.name for kw in existing_keywords)

                    for kw in existing_keywords:
                        if kw.name not in new_keyword_names:
                            kw.delete()

                    for name in new_keyword_names:
                        if name not in existing_keyword_names:
                            ImageKeywords.objects.create(image=image, name=name)

        return Response({
            'success': True,
            'message': 'Image updated successfully.',
            'images': ImagesSerializer(image).data
        }, status=status.HTTP_200_OK)
    
class NumberOfImageDeletedView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        # URL query params বা body থেকে ID list নেওয়ার অপশন রাখলাম
        image_ids = request.query_params.get('image_ids') or request.data.get('image_ids')
        
        if not image_ids:
            return Response({
                "success": False,
                "error": "No image IDs provided."
            }, status=status.HTTP_400_BAD_REQUEST)

        # String হলে CSV থেকে list বানাই
        if isinstance(image_ids, str):
            try:
                image_ids = [int(i.strip()) for i in image_ids.split(',') if i.strip().isdigit()]
            except ValueError:
                return Response({
                    "success": False,
                    "error": "Invalid image ID format."
                }, status=status.HTTP_400_BAD_REQUEST)

        deleted = []
        failed = []

        for image_id in image_ids:
            try:
                image = Images.objects.get(id=image_id)

                cloudflare_id = image.image_id
                result = NUMBER_OF_IMAGE_DELETE_FROM_CLOUDFLARE(cloudflare_id)

                if not result.get("success"):
                    failed.append({
                        "id": image_id,
                        "error": result.get("error", "Cloudflare delete failed.")
                    })
                    continue

                image.delete()
                deleted.append(image_id)

            except Images.DoesNotExist:
                failed.append({
                    "id": image_id,
                    "error": "Image not found."
                })

        return Response({
            "success": True,
            "deleted_ids": deleted,
            "failed": failed
        }, status=status.HTTP_200_OK)


# class NumberOfImageDeletedView(APIView):
#     permission_classes = [IsAuthenticated]

#     def delete(self, request, image_id, *args, **kwargs):
#         try:
#             image = Images.objects.get(id=image_id)

#             cloudflare_id = image.image_id
#             result = NUMBER_OF_IMAGE_DELETE_FROM_CLOUDFLARE(cloudflare_id)

#             if not result.get("success"):
#                 return Response({
#                     "success": False,
#                     "error": result.get("error", "Cloudflare delete failed.")
#                 }, status=status.HTTP_400_BAD_REQUEST)

#             image.delete()

#             return Response({
#                 "success": True,
#                 "message": "Image deleted successfully from both Cloudflare and database."
#             }, status=status.HTTP_200_OK)

#         except Images.DoesNotExist:
#             return Response({
#                 "success": False,
#                 "error": "Image not found."
#             }, status=status.HTTP_404_NOT_FOUND)

class AllImagesDeletedView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        result = DELETE_ALL_IMAGE_FROM_CLOUDFLARE()

        if not result.get('success'):
            return Response({
                'message': 'Error occurred.', 
                'error': result.get('error')
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        images = Images.objects.all()
        total_images = images.count()

        for image in images:
            ImageKeywords.objects.filter(image=image).delete()
            image.delete()

        return Response({
            'success': True,
            'message': 'Images deletion completed.',
            'db_deleted': total_images,
        }, status=status.HTTP_200_OK)

class TotalImagesView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        images = Images.objects.all().order_by('-created_at')
        serializer = ImagesSerializer(images, many=True)
        return Response({
            'success': True,
            'message': 'Total images fetching successfully.',
            'images': serializer.data,
        }, status=status.HTTP_200_OK)
    
class ApprovedImagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        images = Images.objects.filter(status='approved').order_by('-created_at')
        serializer = ImagesSerializer(images, many=True)
        return Response({
            'success': True,
            'message': 'Approved images fetching successfully.',
            'images': serializer.data,
        }, status=status.HTTP_200_OK)

class PendingImagesView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        images = Images.objects.filter(status='pending').order_by('-created_at')
        serializer = ImagesSerializer(images, many=True)
        return Response({
            'success': True,
            'message': 'Pending images fetching successfully.',
            'images': serializer.data,
        }, status=status.HTTP_200_OK)

class RejectedImagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        images = Images.objects.filter(status='rejected').order_by('-created_at')
        serializer = ImagesSerializer(images, many=True)
        return Response({
            'success': True,
            'message': 'Rejected images fetching successfully.',
            'images': serializer.data,
        }, status=status.HTTP_200_OK)
