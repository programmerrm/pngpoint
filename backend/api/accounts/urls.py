from django.urls import path
from api.accounts.views.register import RegisterViewSet
from api.accounts.views.login import LoginViewSet

urlpatterns = [
    path(
        'user/register/',
        RegisterViewSet.as_view({ 'post' : 'create' }),
        name='register',
    ),
    path(
        'user/login/',
        LoginViewSet.as_view(),
        name='login',
    ),
]
