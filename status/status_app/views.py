from rest_framework import filters
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser
from .serializers import UserSerializer, TokenSerializer


class UserUpdateAPIView(APIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get(self, *args, **kwargs):
        current_status = self.request.query_params.get('CurrentStatus')
        unique_id = self.request.query_params.get('UniqueID')

        user = CustomUser.objects.get(id=unique_id)
        statuses = {v: k for k, v in CustomUser.STATUSES}
        status = statuses.get(current_status)

        user.status = status
        user.save()

        return Response({
            'username': user.username,
            'status': user.get_status_display()
         })

class UserLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        user = serializer.get_or_create()

        serializer = TokenSerializer(data={'user': user.pk})
        token = serializer.get_or_create()

        return Response(
            {
                'username': token.user.username,
                'token': token.key
            }
        )


class ProfileAPIView(RetrieveAPIView):
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        return Response(self.serializer_class(request.user).data)


class UserListAPIView(ListAPIView):
    permission_classes = IsAuthenticated,
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('status', 'username')
