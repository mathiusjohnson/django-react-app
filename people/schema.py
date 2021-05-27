import graphene
from graphene_django.types import DjangoObjectType
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

    def mutate(self, _, info, **input):
        person = 'person'

        return CreatePerson(Person=person)

class PersonSchema(ObjectType):

    id = graphene.NonNull(graphene.Int),
    name = graphene.NonNull(graphene.String),


class AllPersonsSchema(ObjectType):

   persons = graphene.NonNull(graphene.List(PersonSchema))

   def resolve_persons(parent, info, **kwargs):
       print(parent)
#    convert_all_db_persons_to_data_class_person_and_then_graphQL_personSchema_list()

class PersonInput(graphene.InputObjectType):
    name = graphene.String(required=True)


class CreatePerson(graphene.Mutation):
    person = graphene.Field(PersonType)

    class Arguments:
        # id = graphene.NonNull(graphene.Int),
        # name = graphene.NonNull(graphene.String),
        # age = graphene.NonNull(graphene.Int),
        # address_one = graphene.NonNull(graphene.String),
        # address_two = graphene.NonNull(graphene.String)

    def mutate(self, _, info, **input):
        # print('mutate')
        per = 'person'
        # print('arguments: ', age, address_one, address_two, name)
        # per = Person.UnstructurePerson(json_data={'age': age, 'address_one': address_one, 'address_two': address_two, 'name': name}, person=person)
        # per.save()
        return CreatePerson(Person=per)
        pass
        
class Mutation(graphene.ObjectType): 
    create_person = CreatePerson.Field(PersonType)
    # pass
