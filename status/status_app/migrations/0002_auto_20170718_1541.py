# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-18 15:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('status_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='status',
            field=models.SmallIntegerField(choices=[(0, 'Working'), (1, 'OnVacation')], default=(1, 'OnVacation'), null=True),
        ),
    ]
