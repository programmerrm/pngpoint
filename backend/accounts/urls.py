from django.urls import path
from accounts.views import LoginViewSet, AdminLoginViewSet, RegisterViewSet

app_name = 'accounts'

urlpatterns = [
    path('login/', LoginViewSet.as_view(), name='user_login'),
    path('admin/login/', AdminLoginViewSet.as_view(), name='admin_login'),
    path('user/register/', RegisterViewSet.as_view({'post': 'create'}), name='user_register'),
]
