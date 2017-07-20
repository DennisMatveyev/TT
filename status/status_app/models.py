from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from .constants import WORKING, ON_VACATION


class CustomUser(AbstractUser):
    STATUSES = (
        (WORKING, 'Working'),
        (ON_VACATION, 'OnVacation')
    )
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_('Required. 150 characters or fewer.')
    )
    status = models.SmallIntegerField(choices=STATUSES, default=WORKING, null=True)
