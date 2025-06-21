from rest_framework import serializers
from images.models import Images
from api.images.serializers.user import UserSerializer
from api.images.serializers.keyword import KeywordSerializer

class ImageSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Images
        fields = '__all__'
        read_only_fields = ('user', 'image_id', 'url')

    def create(self, validated_data):
        return Images.objects.create(**validated_data)
