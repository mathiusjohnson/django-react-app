from django.db.models import JSONField, Model

# Create your models here.

class PersonModel(Model):
    data = JSONField(null=True)

    def __str__(self):
        return self.data