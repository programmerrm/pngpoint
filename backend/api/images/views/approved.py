from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny, IsAdminUser
from images.models import Images
from api.images.serializers.image import ImageSerializer
from images.filters.filters import ImageFilter
from images.pagination.pagination import ImagesPagination

class ApprovedImagesViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    renderer_classes = [JSONRenderer]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ImageFilter
    pagination_class = ImagesPagination

    def list(self, request, *args, **kwargs):
        queryset = Images.objects.filter(status='approved').order_by('-created_at')
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request, view=self)
        serializer = ImageSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
class ApprovedImagesLenghtView(viewsets.ViewSet):
    permission_classes = [IsAdminUser]
    renderer_classes = [JSONRenderer]

    def list(self, request, *args, **kwargs):
        approved_length = Images.objects.filter(status='approved').count()
        return Response({
            'success': True,
            'message': 'Approved images length fetched successfully.',
            'images_length': approved_length,
        }, status=status.HTTP_200_OK)
