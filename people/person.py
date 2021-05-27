from graphene.relay import Node
from graphene.types.generic import GenericScalar # Solution
from graphene_django import DjangoObjectType
from graphql_example.utils import CountableConnectionBase

# from .filters import PersonFilter
from .models import Person


class Person(DjangoObjectType):
    meta = GenericScalar() # Solution
    
    class Meta:
        model = Person
        interfaces = (Node,)
        filterset_class = PersonFilter

    # @age.validator
    # def _check_age(self, attribute, value):
    #     if value <=20:
    #         raise ValueError("age must be greater than 20")

    def structurePerson(json_data: any, person):
        person_object = cattr.structure(json_data, person)
        print(person_object)
        return person_object

    def unstructurePerson(person):
        json_data = cattr.unstructure(person)
        print(json_data)
        return json_data