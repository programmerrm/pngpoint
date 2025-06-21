from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from django_filters.rest_framework import DjangoFilterBackend
from permissions.admin import IsAdminUser
from images.models import Images
from api.images.serializers.image import ImageSerializer
from images.filters.filters import ImageFilter
from images.pagination.pagination import ImagesPagination

class RejectedImagesViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]
    renderer_classes = [JSONRenderer]
    throttle_classes = []
    filter_backends = [DjangoFilterBackend]
    filterset_class = ImageFilter
    pagination_class = ImagesPagination

    def list(self, request, *args, **kwargs):
        queryset = Images.objects.filter(status='rejected').order_by('-created_at')
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request, view=self)
        serializer = ImageSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    