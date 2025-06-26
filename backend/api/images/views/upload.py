import os
import uuid
import json
from django.conf import settings
from django.db import transaction, IntegrityError
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.renderers import JSONRenderer
from permissions.or_permission import IsRegularOrAdminUser
from images.models import Images, ImageKeywords

class ImagesUploadViewSet(APIView):
    permission_classes = [IsRegularOrAdminUser]
    parser_classes = [JSONParser, MultiPartParser]
    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):

        print("Request data : ", request.data)

        try:
            image_files = request.FILES.getlist('images')

            if not image_files:
                return Response({
                    'success': False,
                    'message': 'No images uploaded.',
                }, status=status.HTTP_400_BAD_REQUEST)

            title_list = request.data.getlist("title")
            description_list = request.data.getlist("description")
            keywords_list = request.data.getlist("keywords")
            category = request.data.get("category", "")

            # এখানে media/image ফোল্ডার ব্যবহার করবো
            temp_upload_dir = os.path.join(settings.MEDIA_ROOT, 'image')
            os.makedirs(temp_upload_dir, exist_ok=True)

            image_data_list = []

            with transaction.atomic():
                for idx, image_file in enumerate(image_files):
                    file_name = f"{uuid.uuid4()}_{image_file.name}"
                    temp_path = os.path.join(temp_upload_dir, file_name)

                    # Save file to disk
                    try:
                        with open(temp_path, 'wb+') as destination:
                            for chunk in image_file.chunks():
                                destination.write(chunk)
                    except Exception as file_error:
                        return Response({
                            'success': False,
                            'message': f'Failed to save file: {image_file.name}',
                            'error': str(file_error)
                        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                    # Extract metadata from request
                    title = title_list[idx] if idx < len(title_list) else ''
                    description = description_list[idx] if idx < len(description_list) else ''
                    keywords_str = keywords_list[idx] if idx < len(keywords_list) else ''
                    
                    # keywords JSON decode try করবো, না পারলে কমা দিয়ে split
                    try:
                        keywords_split = json.loads(keywords_str)
                    except json.JSONDecodeError:
                        keywords_split = [kw.strip() for kw in keywords_str.split(',') if kw.strip()]

                    # Save image to DB
                    try:
                        image_instance = Images.objects.create(
                            user=request.user,
                            image_id=str(uuid.uuid4()),
                            title=title,
                            description=description,
                            category=category,
                            url=f"{settings.MEDIA_URL}image/{file_name}",  # URL এখানে সেট করা
                        )
                    except IntegrityError as e:
                        return Response({
                            'success': False,
                            'message': f'Database integrity error for image: {image_file.name}',
                            'error': str(e)
                        }, status=status.HTTP_400_BAD_REQUEST)
                    except ValidationError as ve:
                        return Response({
                            'success': False,
                            'message': f'Validation error for image: {image_file.name}',
                            'error': ve.message_dict
                        }, status=status.HTTP_400_BAD_REQUEST)

                    # Save keywords
                    for kw in keywords_split:
                        try:
                            ImageKeywords.objects.create(
                                image=image_instance,
                                name=kw
                            )
                        except IntegrityError as e:
                            return Response({
                                'success': False,
                                'message': f'Keyword save failed for keyword: {kw}',
                                'error': str(e)
                            }, status=status.HTTP_400_BAD_REQUEST)

                    # Response images data
                    image_data_list.append({
                        'id': image_instance.id,
                        'image_id': image_instance.image_id,
                        'title': image_instance.title,
                        'slug': image_instance.slug,
                        'description': image_instance.description,
                        'category': image_instance.category,
                        'url': image_instance.url,
                        'status': image_instance.status,
                        'download_count': image_instance.download_count,
                        'created_at': image_instance.created_at,
                        'updated_at': image_instance.updated_at,
                        'keywords': keywords_split,
                    })

            return Response({
                'success': True,
                'message': f'{len(image_files)} images uploaded successfully.',
                'images': image_data_list,
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'success': False,
                'message': 'Something went wrong while uploading images.',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
