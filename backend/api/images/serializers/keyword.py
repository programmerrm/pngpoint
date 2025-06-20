from rest_framework import serializers
from images.models import ImageKeywords

class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageKeywords
        fields = '__all__'
