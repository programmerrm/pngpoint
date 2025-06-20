from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from api.accounts.serializers.register import RegisterSerializer

class RegisterViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]
    renderer_classes = [JSONRenderer]
    throttle_classes = []

    def create(self, request, *args, **kwargs):
        if not request.data:
            return Response({
                'success': False,
                'message': 'No data provided',
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = RegisterSerializer(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'User registered successfully.',
                    'data': serializer.data,
                }, status=status.HTTP_201_CREATED)
            return Response({
                'success': False,
                'message': 'validation errors',
                'errors': serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': '',
                'errors': f'An error occurred: {str(e)}.',
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        