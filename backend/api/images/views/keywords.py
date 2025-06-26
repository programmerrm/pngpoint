from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from images.models import ImageKeywords
from api.images.serializers.keyword import KeywordSerializer

class KeywordsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        all_keywords = ImageKeywords.objects.all().order_by('id')
        seen_names = set()
        unique_keywords = []

        for kw in all_keywords:
            if kw.name not in seen_names:
                seen_names.add(kw.name)
                unique_keywords.append(kw)

        serializer = KeywordSerializer(unique_keywords, many=True)
        return Response({
            'success': True,
            'message': 'Unique keywords fetched successfully.',
            'data': serializer.data
        })
