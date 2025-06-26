from django.urls import path
from api.accounts.views.register import RegisterViewSet
from api.accounts.views.login import UserLoginView, AdminLoginView

urlpatterns = [
    path(
        'user/register/',
        RegisterViewSet.as_view({ 'post' : 'create' }),
        name='register',
    ),
    path(
        'user/login/',
        UserLoginView.as_view(),
        name='login',
    ),
    path(
        'admin/login/',
        AdminLoginView.as_view(),
        name='admin_login',
    ),
]
