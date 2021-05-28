from django.db import models

# Create your models here.

class PersonModel(models.Model):
    data = models.JSONField(null=True)

    class Meta:
        db_table = 'people'