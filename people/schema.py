import graphene
from graphene.types import inputobjecttype
from graphene_django.types import ObjectType
# from .models import Person
from .person import Person

class PersonType(ObjectType):
    class Meta:
        
        model = Person

class Query(object):
    all_Persons = graphene.List(PersonType)

    def resolve_all_Persons(self, info, **kwargs):
        return Person.objects.all()

class CreatePerson(graphene.Mutation):
    Person = graphene.Field(PersonType)

    class Arguments:
        id = graphene.NonNull(graphene.Int),
        name = graphene.NonNull(graphene.String),
        age = graphene.NonNull(graphene.Int),
        address_one = graphene.NonNull(graphene.String),
        address_two = graphene.NonNull(graphene.String)

    def mutate(self, info, name, age, address_one, address_two):
        class json_data:
            age, 
            address_one, 
            address_two, 
            name
        person = Person.structurePerson(json_data, self)
        person.save()
        return CreatePerson(Person=person)

class PersonSchema(ObjectType):

    id = graphene.NonNull(graphene.Int),
    name = graphene.NonNull(graphene.String),
    age = graphene.NonNull(graphene.Int),
    address_one = graphene.NonNull(graphene.String),
    address_two = graphene.NonNull(graphene.String)


class AllPersonsSchema(ObjectType):

   persons = graphene.NonNull(graphene.List(PersonSchema))

   def resolve_persons(self, info):
       print(self)
#    convert_all_db_persons_to_data_class_person_and_then_graphQL_personSchema_list()

class PersonInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    age = graphene.Int(required=True)

class CreatePerson(graphene.Mutation):
    person = graphene.Field(PersonType)

    class Arguments:
        id = graphene.NonNull(graphene.Int),
        name = graphene.NonNull(graphene.String),
        age = graphene.NonNull(graphene.Int),
        address_one = graphene.NonNull(graphene.String),
        address_two = graphene.NonNull(graphene.String)

    def mutate(self, info, age, address_one, address_two, name, person):
        class json_data:
            age, 
            address_one, 
            address_two, 
            name
        per = Person.structurePerson(json_data, person)
        per.save()
        return CreatePerson(Person=per)
        
class Mutation(graphene.ObjectType): 
    create_person = CreatePerson.Field()
