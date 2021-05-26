import graphene
from graphene.types import inputobjecttype
from graphene_django.types import DjangoObjectType
from .models import PersonProperties

class PersonType(DjangoObjectType):
    class Meta:
        model = PersonProperties
class Query(object):
    all_PersonPropertiess = graphene.List(PersonType)

    def resolve_all_PersonPropertiess(self, info, **kwargs):
        return PersonProperties.objects.all()

class CreatePersonProperties(graphene.Mutation):
    PersonProperties = graphene.Field(PersonType)

    class Arguments:
        id = graphene.NonNull(graphene.Int),
        name = graphene.NonNull(graphene.String),
        age = graphene.NonNull(graphene.Int),
        address_one = graphene.NonNull(graphene.String),
        address_two = graphene.NonNull(graphene.String)

    def mutate(self, info, name, age, address_one, address_two):
        loc = PersonProperties(lat=lat, lon=lon, name=name)
        loc.save()
        return CreatePersonProperties(PersonProperties=loc)

class PersonSchema(DjangoObjectType):

    id = graphene.NonNull(graphene.Int),
    name = graphene.NonNull(graphene.String),
    age = graphene.NonNull(graphene.Int),
    address_one = graphene.NonNull(graphene.String),
    address_two = graphene.NonNull(graphene.String)


class AllPersonsSchema(DjangoObjectType):

   persons = graphene.NonNull(graphene.List(PersonSchema))

   def resolve_persons(self, info, **kwargs):
       print(self)
#    convert_all_db_persons_to_data_class_person_and_then_graphQL_personSchema_list()
 
class Mutation(inputobjecttype): 

  # this mutation updates the person with given id to the given age

  id = graphene.NonNull(graphene.Int),

  age = graphene.NonNull(graphene.Int),