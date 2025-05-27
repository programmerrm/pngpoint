from rest_framework import serializers
from .models import UploadedImage
from PIL import Image

class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = '__all__'

    def create(self, validated_data):
        image_file = validated_data.get('image')
        img = Image.open(image_file)
        metadata = img.info

        title = metadata.get('Title') or metadata.get('title') or ''
        tags = metadata.get('Tags') or metadata.get('tags') or ''

        validated_data['title'] = title
        validated_data['tags'] = tags

        return super().create(validated_data)
