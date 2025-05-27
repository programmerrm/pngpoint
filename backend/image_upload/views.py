from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UploadedImageSerializer
from .models import UploadedImage
from rest_framework.permissions import IsAuthenticated

class MultiImageUploadView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        images = request.FILES.getlist('images')
        uploaded = []

        for image in images:
            serializer = UploadedImageSerializer(data={'image': image})
            if serializer.is_valid():
                serializer.save()
                uploaded.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(uploaded, status=status.HTTP_201_CREATED)
