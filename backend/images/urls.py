from django.urls import path
from images.views import ImagesUploadView, ImagesUpdatedView, AllImagesDeletedView, NumberOfImageDeletedView, TotalImagesView, ApprovedImagesView, PendingImagesView, RejectedImagesView

urlpatterns = [
    path('upload/', ImagesUploadView.as_view(), name='image_upload'),
    path('<int:image_id>/updated/', ImagesUpdatedView.as_view(), name='updated_image'),
    path('deleted-all/', AllImagesDeletedView.as_view(), name='all_images_deleted'),
    path('delete/', NumberOfImageDeletedView.as_view(), name='images_delete'),
    path('total/', TotalImagesView.as_view(), name='total_images'),
    path('approved/', ApprovedImagesView.as_view(), name='approved_images'),
    path('pending/', PendingImagesView.as_view(), name='pending_images'),
    path('rejected/', RejectedImagesView.as_view(), name='rejected_images'),
]
