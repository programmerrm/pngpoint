from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from accounts.serializers import LoginSerializer, RegisterSerializer, ChangePasswordSerializer, AdminProfileSerializer, AdminProfileUpdatedSerializer

User = get_user_model()

# Create your views here.

class AdminLoginViewSet(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            email = data.get('email')
            password = data.get('password')

            if not email:
                return Response({
                    "success": False,
                    "message": "Email is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            if not password:
                return Response({
                    "success": False,
                    "message": "Password is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.filter(email=email).first()

            if not user:
                return Response({
                    "success": False,
                    "message": "No account found with this email address.",
                }, status=status.HTTP_401_UNAUTHORIZED)
            
            if not user.is_superuser:
                return Response({
                    "success": False,
                    "message": "Access denied. This login is for admin users only.",
                }, status=status.HTTP_403_FORBIDDEN)
            
            if not user.is_active:
                return Response({
                    "success": False,
                    "message": "Your account is inactive. Please contact support."
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if user.is_block:
                return Response({
                    "success": False,
                    "message": "Your account is blocked. Please contact support."
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if user.check_password(password):
                serializer = LoginSerializer(user)
                tokens = user.tokens()
                return Response({
                    "admin": serializer.data,
                    "tokens": tokens,
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "success": False,
                    "message": "Password does not match",
                }, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({
                "success": False,
                "message": "Something went wrong on the server.",
                "error": f"An error occurred: {str(e)}.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginViewSet(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            email = data.get('email')
            password = data.get('password')

            if not email:
                return Response({
                    "success": False,
                    "message": "Email is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            if not password:
                return Response({
                    "success": False,
                    "message": "Password is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.filter(email=email).first()

            if not user:
                return Response({
                    "success": False,
                    "message": "No account found with this email address.",
                }, status=status.HTTP_401_UNAUTHORIZED)
            
            if not user.is_actived:
                return Response({
                    "success": False,
                    "message": "Your account is inactive. Please contact support."
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if user.is_blocked:
                return Response({
                    "success": False,
                    "message": "Your account is blocked. Please contact support."
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if user.is_superuser:
                return Response({
                    "success": False,
                    "message": "This is an admin account. Admin account not allowed!",
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if user.check_password(password):
                serializer = LoginSerializer(user)
                tokens = user.tokens()
                return Response({
                    "user": serializer.data,
                    "tokens": tokens,
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "success": False,
                    "message": "Password does not match",
                }, status=status.HTTP_401_UNAUTHORIZED)
            
        except Exception as e:
            return Response({
                "success": False,
                "message": "Something went wrong on the server.",
                "error": f"An error occurred: {str(e)}.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RegisterViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        try:
            if serializer.is_valid():
                user = serializer.save()
                return Response({
                    "success": True,
                    "message": "User registered successfully",
                    "user": RegisterSerializer(user).data,
                }, status=status.HTTP_200_OK)
            return Response({
                "success": False,
                "message": "Validation failed",
                "errors": serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                "success": False,
                "message": "Something went wrong on the server.",
                "error": f"An error occurred: {str(e)}.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Password changed successfully",
            }, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class AdminProfileViewSet(viewsets.ModelViewSet):
    serializer_class = AdminProfileSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def perform_update(self, serializer):
        serializer.save()

class AdminProfileUpdatedViewSet(viewsets.ModelViewSet):
    serializer_class = AdminProfileUpdatedSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()
