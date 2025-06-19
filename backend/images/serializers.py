from rest_framework import serializers
from accounts.models import User
from images.models import Images, ImageKeywords

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'image', 'username', 'slug', 'email', 'first_name', 'last_name', 'number', 'role']

class ImagesKeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageKeywords
        fields = '__all__'

class ImagesSerializer(serializers.ModelSerializer):
    keywords = ImagesKeywordSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Images
        fields = '__all__'
        read_only_fields = ('user', 'image_id', 'url')

    def create(self, validated_data):
        return Images.objects.create(**validated_data)
   