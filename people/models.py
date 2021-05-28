from django.db import models
from django.contrib.postgres.fields.jsonb import JSONField

# Create your models here.

class PersonModel(models.Model):
    data = JSONField(null=True)