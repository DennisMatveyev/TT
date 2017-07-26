import json

from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework.authtoken.models import Token
from status_app.models import CustomUser


class StatusTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create(username='test')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_login(self):
        url = reverse('api:login')
        data = {'username': 'test'}
        resp = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(resp.status_code, 200)

        tokens_cnt = Token.objects.filter(user__username='test').count()
        self.assertEqual(tokens_cnt, 1)

    def test_profile(self):
        url = reverse('api:profile')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['status'], 0)
        self.assertEqual(resp.data['username'], 'test')

    def test_user_list(self):
        url = reverse('api:user-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.data), 1)

    def test_update_status(self):
        url = '{url}?UniqueID={user_id}&CurrentStatus={current_status}'.format(
            url=reverse('api:user-update'),
            user_id=self.user.id,
            current_status='OnVacation'
        )
        resp = self.client.get(url)
        self.assertEqual(resp.data.get('status'), 'OnVacation')
