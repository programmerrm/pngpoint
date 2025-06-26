from django.urls import path
from api.images.views.upload import ImagesUploadViewSet
from api.images.views.total import TotalImagesViewSet, TotalImagesLenghtView
from api.images.views.approved import ApprovedImagesViewSet, ApprovedImagesLenghtView
from api.images.views.pending import PendingImagesViewSet, PendingImagesLenghtView
from api.images.views.rejected import RejectedImagesViewSet, RejectedImagesLenghtView
from api.images.views.single_image import SingleImageView
from api.images.views.download import DownloadImageViewSet
from api.images.views.keywords import KeywordsView
from api.images.views.deleted import SingleImageDeleteView, NumberOfImageDeleteView, ALLImageDeleteView

urlpatterns = [
    path(
        'total-images-lenght/',
        TotalImagesLenghtView.as_view({ 'get' : 'list' }),
        name='total_images_lenght',
    ),
    path(
        'approved-images-lenght/',
        ApprovedImagesLenghtView.as_view({ 'get' : 'list' }),
        name='approved_images_lenght',
    ),
    path(
        'pending-images-lenght/',
        PendingImagesLenghtView.as_view({ 'get' : 'list' }),
        name='pending_images_lenght',
    ),
    path(
        'rejected-images-lenght/',
        RejectedImagesLenghtView.as_view({ 'get' : 'list' }),
        name='rejected_images_lenght',
    ),
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
        'keywords/',
        KeywordsView.as_view(),
        name='keywords',
    ),
    path(
        '<str:slug>/',
        SingleImageView.as_view({ 'get' : 'list' }),
        name='single_image',
    ),
    path(
        'download/<str:pk>/',
        DownloadImageViewSet.as_view({'get': 'retrieve'}),
        name='download_image',
    ),
    path(
        'delete/<int:pk>/',
        SingleImageDeleteView.as_view({'delete': 'destroy'}),
        name='single_image_delete',
    ),
    path(
        'deletes/<int:pk>/',
        NumberOfImageDeleteView.as_view({'delete': 'destroy'}),
        name='number_of_image_delete',
    ),
    path(
        'delete-all/',
        ALLImageDeleteView.as_view({'delete': 'destroy'}),
        name='all_image_delete',
    ),
]
