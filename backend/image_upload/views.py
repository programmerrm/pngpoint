import json
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import MultiPartParser
from image_upload.models import CloudflareImageModel, CloudflareImageKeyword
from image_upload.serializers import CloudflareImageSerializer
from image_upload.services import UPLOAD_IMAGE_TO_CLOUDFLARE, GET_IMAGE_URL_FROM_CLOUDFLARE, DELETE_ALL_IMAGE_FROM_CLOUDFLARE
logger = logging.getLogger(__name__)

class CloudflareImageUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        image_files = request.FILES.getlist("images")

        if not image_files:
            return Response({"error": "No images uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        title = request.data.getlist("title")
        description = request.data.getlist("description")
        keywords = request.data.getlist("keywords")

        uploaded_images = []

        for idx, image_file in enumerate(image_files):
            try:
                image_id = UPLOAD_IMAGE_TO_CLOUDFLARE(image_file)
                image_url = GET_IMAGE_URL_FROM_CLOUDFLARE(image_id)

                image_obj = CloudflareImageModel.objects.create(
                    user=request.user,
                    image_id=image_id,
                    url=image_url,
                    title=title[idx] if idx < len(title) else '',
                    description=description[idx] if idx < len(description) else '',
                    status='approved' if request.user.role == 'admin' else 'pending',
                    category=request.data.get("category", "Uncategorized")
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
                            CloudflareImageKeyword.objects.create(
                                cloudflareImageModel=image_obj,
                                name=keyword
                            )

                uploaded_images.append(CloudflareImageSerializer(image_obj).data)

            except Exception as e:
                logger.error("Upload failed for %s: %s", image_file.name, e)

        if not uploaded_images:
            return Response({"error": "Upload failed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"uploaded": uploaded_images}, status=status.HTTP_201_CREATED)


class CloudflareImageUpdatedView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, image_id, *args, **kwargs):
        try:
            image = CloudflareImageModel.objects.get(id=image_id)
        except CloudflareImageModel.DoesNotExist:
            return Response({'error': 'Image not found or permission denied.'}, status=status.HTTP_404_NOT_FOUND)

        # Extract image fields to update
        updatable_fields = ['title', 'description', 'category', 'status']
        data = {field: request.data[field] for field in updatable_fields if field in request.data}

        serializer = CloudflareImageSerializer(image, data=data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        # Handle keywords
        keywords = request.data.get('keywords')
        if keywords is not None:
            CloudflareImageKeyword.objects.filter(cloudflareImageModel=image).delete()

            # Convert to list if needed
            if isinstance(keywords, str):
                try:
                    keywords = json.loads(keywords)
                    if not isinstance(keywords, list):
                        keywords = [str(keywords)]
                except json.JSONDecodeError:
                    keywords = [kw.strip() for kw in keywords.split(',') if kw.strip()]

            if isinstance(keywords, list):
                for keyword in keywords:
                    CloudflareImageKeyword.objects.create(
                        cloudflareImageModel=image,
                        name=str(keyword).strip()
                    )

        return Response({
            'message': 'Image updated successfully.',
            'data': CloudflareImageSerializer(image).data
        }, status=status.HTTP_200_OK)



# class CloudflareImageUpdatedView(APIView):
#     permission_classes = [IsAdminUser]

#     def patch(self, request, image_id, *args, **kwargs):
#         try:
#             image = CloudflareImageModel.objects.get(id=image_id)
#         except CloudflareImageModel.DoesNotExist:
#             return Response({'error': 'Image not found or permission denied.'}, status=status.HTTP_404_NOT_FOUND)

#         data = {}

#         if 'title' in request.data:
#             data['title'] = request.data['title']

#         if 'description' in request.data:
#             data['description'] = request.data['description']

#         if 'category' in request.data:
#             data['category'] = request.data['category']

#         if 'status' in request.data:
#             data['status'] = request.data['status']

#         serializer = CloudflareImageSerializer(image, data=data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         if 'keywords' in request.data:
#             keyword_input = request.data['keywords'].strip()

#             CloudflareImageKeyword.objects.filter(cloudflareImageModel=image).delete()

#             if keyword_input:
#                 try:
#                     parsed_keywords = json.loads(keyword_input)
#                     if not isinstance(parsed_keywords, list):
#                         parsed_keywords = [str(parsed_keywords)]
#                 except json.JSONDecodeError:
#                     parsed_keywords = [kw.strip() for kw in keyword_input.split(',') if kw.strip()]

#                 for keyword in parsed_keywords:
#                     CloudflareImageKeyword.objects.create(
#                         cloudflareImageModel=image,
#                         name=keyword
#                     )

#         return Response({'message': 'Image updated successfully.', 'data': CloudflareImageSerializer(image).data}, status=status.HTTP_200_OK)

class CloudflareImagesDeletedView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        pass 

class CloudflareAllImageDeletedView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, *args, **kwargs):
        result = DELETE_ALL_IMAGE_FROM_CLOUDFLARE()

        if not result.get("success"):
            return Response({"message": "Error occurred.", "error": result.get("error")}, status=500)
        images = CloudflareImageModel.objects.all()
        total_images = images.count()

        for image in images:
            CloudflareImageKeyword.objects.filter(cloudflareImageModel=image).delete()
            image.delete()

        return Response({
            "message": "Cloudflare image deletion complete.",
            "cloudflare_deleted": result["deleted"],
            "cloudflare_failed": result["failed"],
            "db_deleted": total_images
        }, status=200)

class CloudflareTotalImageView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        images = CloudflareImageModel.objects.all().order_by('-created_at')
        serializer = CloudflareImageSerializer(images, many=True)
        return Response({"total_images": serializer.data}, status=status.HTTP_200_OK)
    
class CloudflareApprovedImageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        images = CloudflareImageModel.objects.filter(status='approved').order_by('-created_at')
        serializer = CloudflareImageSerializer(images, many=True)
        return Response({"approved_images": serializer.data}, status=status.HTTP_200_OK)

class CloudflarePendingImageView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        images = CloudflareImageModel.objects.filter(status='pending').order_by('-created_at')
        serializer = CloudflareImageSerializer(images, many=True)
        return Response({"pending_images": serializer.data}, status=status.HTTP_200_OK)

class CloudflareRejectedImageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        images = CloudflareImageModel.objects.filter(status='rejected').order_by('-created_at')
        serializer = CloudflareImageSerializer(images, many=True)
        return Response({"rejected_images": serializer.data}, status=status.HTTP_200_OK)
