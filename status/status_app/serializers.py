from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.authtoken.models import Token
from .models import CustomUser


class UserSerializer(ModelSerializer):
    status_display = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'status', 'status_display']
        extra_kwargs = {'status_display': {'read_only': True}}

    def get_or_create(self):
        user, created = CustomUser.objects.get_or_create(**self.initial_data)
        return user

    def get_status_display(self, obj):
        return obj.get_status_display()



class TokenSerializer(ModelSerializer):
    class Meta:
        model = Token
        fields = ['user', 'key']
        extra_kwargs = {'key': {'read_only': True}}

    def get_or_create(self):
        user = CustomUser.objects.get(id=self.initial_data.get('user'))
        token, created = Token.objects.get_or_create(user=user)
        return token
