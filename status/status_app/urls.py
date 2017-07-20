from django.conf.urls import url
from .views import (UserLoginAPIView,
                    UserListAPIView,
                    UserUpdateAPIView,
                    ProfileAPIView)


urlpatterns = [
    url(r'^login/$', UserLoginAPIView.as_view(), name='login'),
    url(r'^profile/$', ProfileAPIView.as_view(), name='profile'),
    url(r'^user_list/$', UserListAPIView.as_view(), name='user-list'),
    url(r'^update_status/$', UserUpdateAPIView.as_view(), name='user-update')
]