from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class ImagesPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = 'page_size'
    max_page_size = 10000000

    def get_paginated_response(self, data):
        return Response({
            'success': True,
            'message': 'Images fetching successfully.',
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'images': data,
        })
