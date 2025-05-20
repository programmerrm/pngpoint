from django.urls import path
from rest_framework.routers import DefaultRouter
from accounts.views import RegisterViewSet, LoginViewSet, AdminLoginViewSet

router = DefaultRouter()
router.register(r'user/register', RegisterViewSet, basename='register')

urlpatterns = router.urls + [
    path('dashboard/login/', AdminLoginViewSet.as_view(), name='dashboard-login'),
    path('user/login/', LoginViewSet.as_view(), name='login'),
]
