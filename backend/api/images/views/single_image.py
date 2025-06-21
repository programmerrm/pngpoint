from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer
from images.models import Images
from api.images.serializers.image import ImageSerializer
from images.pagination.pagination import ImagesPagination
from django.shortcuts import get_object_or_404

class SingleImageView(viewsets.ViewSet):
    permission_classes = [AllowAny]
    renderer_classes = [JSONRenderer]
    pagination_class = ImagesPagination

    def list(self, request, slug=None, *args, **kwargs):
        image = get_object_or_404(Images, slug=slug)

        related_images = Images.objects.filter(
            category=image.category
        ).exclude(id=image.id).order_by('-created_at')

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(related_images, request, view=self)
        related_serializer = ImageSerializer(page, many=True)

        main_image_serializer = ImageSerializer(image)

        response = paginator.get_paginated_response(related_serializer.data)

        response.data['image'] = main_image_serializer.data
        response.data['message'] = "Image with related images fetched successfully."
        response.data['success'] = True

        return response
