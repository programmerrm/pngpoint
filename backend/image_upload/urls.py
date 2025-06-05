from django.urls import path
from image_upload.views import CloudflareImageUploadView, CloudflareImageUpdatedView, CloudflareAllImageDeletedView, CloudflareTotalImageView, CloudflareApprovedImageView, CloudflarePendingImageView, CloudflareRejectedImageView

urlpatterns = [
    path('cloudflare/', CloudflareImageUploadView.as_view(), name='cloudflare_image_upload'),
    path('cloudflare/<int:image_id>/update/', CloudflareImageUpdatedView.as_view(), name='update-image'),
    path('cloudflare/delete-all/', CloudflareAllImageDeletedView.as_view(), name='cloudflare-delete-all-images'),
    path('images/total/', CloudflareTotalImageView.as_view(), name='total-images'),
    path('images/approved/', CloudflareApprovedImageView.as_view(), name='approved-images'),
    path('images/pending/', CloudflarePendingImageView.as_view(), name='pending-images'),
    path('images/rejected/', CloudflareRejectedImageView.as_view(), name='rejected-images'),
]
