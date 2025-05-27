from django.urls import path
from accounts.views import LoginViewSet, AdminLoginViewSet, RegisterViewSet, ChangePasswordView, AdminProfileViewSet, AdminProfileUpdatedViewSet

app_name = 'accounts'

urlpatterns = [
    path('login/', LoginViewSet.as_view(), name='user_login'),
    path('admin/login/', AdminLoginViewSet.as_view(), name='admin_login'),
    path('user/register/', RegisterViewSet.as_view({'post': 'create'}), name='user_register'),
    path('password-change/', ChangePasswordView.as_view(), name='password_chnage'),
    path('admin/profile/', AdminProfileViewSet.as_view({ 'get': 'list' }), name='admin_profile'),
    path('admin-profile/updated/', AdminProfileUpdatedViewSet.as_view({'put': 'update'}), name='admin-profile_updated'),
]
