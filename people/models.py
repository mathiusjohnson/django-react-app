from django.db import models


class Person(models.Model):
    first_name = models.CharField(max_length=30, help_text='First name of the person.')
    last_name = models.CharField(max_length=30, help_text='Last name of the person.')
    metadata = models.JSONField(default=dict, blank=True, help_text='Metadata of the person.')