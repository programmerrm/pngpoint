import requests
from django.conf import settings
from django.http import HttpResponse, Http404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from images.models import Images
from django.utils.text import slugify

class DownloadImageViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def retrieve(self, request, pk=None):
        image_id = pk
        try:
            image = Images.objects.get(image_id=image_id, status="approved")
        except Images.DoesNotExist:
            raise Http404("Image not found")

        variant = "public"
        image_url = f"https://{settings.CLOUDFLARE_IMAGES_DOMAIN}/{settings.CLOUDFLARE_ACCOUNT_HASH}/{image_id}/{variant}"

        try:
            response = requests.get(image_url, stream=True)
            response.raise_for_status()
        except requests.exceptions.RequestException:
            raise Http404("Unable to fetch image from Cloudflare.")

        image.download_count += 1
        image.save(update_fields=["download_count"])

        filename = f"{slugify(image.title or image_id)}.png"
        content_type = response.headers.get("Content-Type", "image/png")

        return HttpResponse(
            response.content,
            content_type=content_type,
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"'
            }
        )
