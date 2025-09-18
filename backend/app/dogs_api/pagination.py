from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

NUM_DOGS_PER_PAGE = 20


class DogListNumPagination(PageNumberPagination):
    page_size = NUM_DOGS_PER_PAGE
    page_size_query_param = None
    max_page_size = NUM_DOGS_PER_PAGE

    def get_paginated_response(self, data):
        return Response(
            {
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "current_page": self.page.number,
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "data": data,
            },
            status=200,
        )
