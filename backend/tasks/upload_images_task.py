import os
import json
import logging
from celery import shared_task
from django.contrib.auth import get_user_model
from images.models import Images, ImageKeywords
from api.images.serializers.upload import UploadSerializer
from images.services.cloudflare import UPLOAD_IMAGE_TO_CLOUDFLARE, GET_IMAGE_URL_FROM_CLOUDFLARE

User = get_user_model()
logger = logging.getLogger(__name__)

@shared_task
def upload_images_task(user_id, image_data_list):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        logger.error("Invalid user for image upload task.")
        return []

    uploaded_images = []

    for data in image_data_list:
        image_path = data['file_path']
        title = data.get('title', '')
        description = data.get('description', '')
        category = data.get('category', '')
        keywords = data.get('keywords', '')

        try:
            with open(image_path, 'rb') as file:
                image_id = UPLOAD_IMAGE_TO_CLOUDFLARE(file)
            image_url = GET_IMAGE_URL_FROM_CLOUDFLARE(image_id)

            image_obj = Images.objects.create(
                user=user,
                image_id=image_id,
                url=image_url,
                title=title,
                description=description,
                status='approved' if user.role == 'admin' else 'pending',
                category=category
            )

            try:
                parsed_keywords = json.loads(keywords)
                if not isinstance(parsed_keywords, list):
                    parsed_keywords = [str(parsed_keywords)]
            except json.JSONDecodeError:
                parsed_keywords = [kw.strip() for kw in keywords.split(",") if kw.strip()]

            for keyword in parsed_keywords:
                ImageKeywords.objects.create(
                    image=image_obj,
                    name=keyword
                )

            uploaded_images.append(UploadSerializer(image_obj).data)

        except Exception as e:
            logger.error("Image upload failed: %s", e)

        finally:
            if os.path.exists(image_path):
                os.remove(image_path)

    return uploaded_images
