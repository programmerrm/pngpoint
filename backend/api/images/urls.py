from django.urls import path
from api.images.views.upload import ImagesUploadViewSet

urlpatterns = [
    path(
        'upload/',
        ImagesUploadViewSet.as_view(),
        name='image_upload',
    ),
]
