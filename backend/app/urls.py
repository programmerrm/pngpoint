from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

API_BASE_URL = 'api/v1'

urlpatterns = [
    path(f'{API_BASE_URL}/images/', include('images.urls')),
    path(f'{API_BASE_URL}/accounts/', include('accounts.urls', namespace='accounts')),
    path(f'{API_BASE_URL}/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(f'{API_BASE_URL}/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(f'{API_BASE_URL}/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += staticfiles_urlpatterns()
