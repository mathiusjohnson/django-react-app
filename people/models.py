from django.db import models

# Create your models here.

class PersonProperties(models.Model):
    name = models.CharField(max_length=200)
    data = models.JSONField(null=True)
    
    def __str__(self):
        return self.name