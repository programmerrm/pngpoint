from rest_framework import serializers
from accounts.models import User
from image_upload.models import CloudflareImageModel, CloudflareImageKeyword

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'image', 'username', 'slug', 'email', 'first_name', 'last_name', 'number', 'role']

class CloudflareImageKeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CloudflareImageKeyword
        fields = '__all__'

class CloudflareImageSerializer(serializers.ModelSerializer):
    cloudflareImageKeywords = CloudflareImageKeywordSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = CloudflareImageModel
        fields = '__all__'
        read_only_fields = ('user', 'image_id', 'url')

    def create(self, validated_data):
        return CloudflareImageModel.objects.create(**validated_data)
    