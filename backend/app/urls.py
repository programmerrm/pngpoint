from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

BASE_API = 'v1'

urlpatterns = [
    path(f'{BASE_API}/images/', include('api.images.urls')),
    path(f'{BASE_API}/accounts/', include('api.accounts.urls')),
    path(f'{BASE_API}/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(f'{BASE_API}/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path(f'{BASE_API}/schema/', SpectacularAPIView.as_view(), name='schema'),
    path(f'{BASE_API}/schema/swagger-ui/', SpectacularSwaggerView.as_view(), name='swagger_ui'),
    path(f'{BASE_API}/schema/redoc/', SpectacularRedocView.as_view(), name='redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += staticfiles_urlpatterns()
