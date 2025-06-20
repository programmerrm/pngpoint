import os
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from permissions.or_permission import IsRegularOrAdminUser
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.renderers import JSONRenderer
from tasks.upload_images_task import upload_images_task

class ImagesUploadViewSet(APIView):
    permission_classes = [IsRegularOrAdminUser]
    parser_classes = [JSONParser, MultiPartParser]
    renderer_classes = [JSONRenderer]
    throttle_classes = []

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
        category = request.data.get("category", "")

        temp_upload_dir = os.path.join(settings.MEDIA_ROOT, 'temp_uploads')
        os.makedirs(temp_upload_dir, exist_ok=True)

        image_data_list = []

        for idx, image_file in enumerate(image_files):
            temp_path = os.path.join(temp_upload_dir, image_file.name)
            with open(temp_path, 'wb+') as destination:
                for chunk in image_file.chunks():
                    destination.write(chunk)

            image_data_list.append({
                'file_path': temp_path,
                'title': title[idx] if idx < len(title) else '',
                'description': description[idx] if idx < len(description) else '',
                'keywords': keywords[idx] if idx < len(keywords) else '',
                'category': category
            })

        upload_images_task.delay(request.user.id, image_data_list)

        return Response({
            'success': True,
            'message': f'{len(image_files)} images uploading successfully.'
        }, status=status.HTTP_200_OK)
