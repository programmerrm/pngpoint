from django.urls import path
from .views import MultiImageUploadView

urlpatterns = [
    path('upload-multiple/', MultiImageUploadView.as_view(), name='upload-multiple'),
]
