from django.db import models
from django.db.models.fields.json import JSONField

# Create your models here.

class PersonProperties(models.Model):
    properties = JSONField()