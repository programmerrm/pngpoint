from django.urls import path
from api.images.views.upload import ImagesUploadViewSet
from api.images.views.total import TotalImagesViewSet
from api.images.views.approved import ApprovedImagesViewSet
from api.images.views.pending import PendingImagesViewSet
from api.images.views.rejected import RejectedImagesViewSet
from api.images.views.single_image import SingleImageView

urlpatterns = [
    path(
        'upload/',
        ImagesUploadViewSet.as_view(),
        name='image_upload',
    ),
    path(
        'total/',
        TotalImagesViewSet.as_view({ 'get': 'list' }),
        name='total_images'
    ),
    path(
        'approved/',
        ApprovedImagesViewSet.as_view({ 'get' : 'list' }),
        name='approved_images'
    ),
    path(
        'pending/',
        PendingImagesViewSet.as_view({ 'get' : 'list' }),
        name='pending_images'
    ),
    path(
        'rejected/',
        RejectedImagesViewSet.as_view({ 'get' : 'list' }),
        name='rejected_images'
    ),
    path(
        '<str:slug>/',
        SingleImageView.as_view({ 'get' : 'list' }),
        name='single_image',
    ),
]
