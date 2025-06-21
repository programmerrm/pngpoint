from django_filters import rest_framework as filters
from images.models import Images

class ImageFilter(filters.FilterSet):
    category = filters.CharFilter(field_name='category', lookup_expr='iexact')
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    keyword = filters.CharFilter(method='filter_by_keyword')

    def filter_by_keyword(self, queryset, name, value):
        return queryset.filter(keywords__name__icontains=value)

    class Meta:
        model = Images
        fields = ['category', 'title', 'keyword']
