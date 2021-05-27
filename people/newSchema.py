# from typing_extensions import Required
import graphene
import cattr
from graphene import Mutation, InputObjectType,ObjectType, String, Boolean, Field, Int, List, NonNull, ID
from .models import PersonModel
from .person import PersonDataClass

class PersonSchema(ObjectType):

    id = NonNull(Int),
    name = NonNull(String),
    age = NonNull(Int),
    address_one = NonNull(String),
    address_two = NonNull(String)

class PersonSchemaOutput(PersonSchema, ObjectType):
# notice we only need ID in output and not in input of Mutation of Create
    id = graphene.ID
    pass


class PersonSchemaInputCreate(PersonSchema, InputObjectType):
    pass 


class PersonSchemaInputUpdate(InputObjectType):
# lets say we only allow update of following
    id = graphene.ID
    name = String,
    age = Int,
    pass

class Query(ObjectType):
    all_persons = List(PersonSchema)
    person = Field(PersonSchema, person_id=Int())
    def resolve_all_persons(self, info, **kwargs):
        persons_set = PersonModel.objects.all()
        # python shortcut for arrays
        return [
        PersonSchemaOutput(
        id = person_db_record.id,
        name= person_db_record.data["name"],
        age=person_db_record.data["age"],
        address_one=person_db_record.data["address_one"],
        address_two=person_db_record.data["address_two"])
        for person_db_record in persons_set
        ]
    def resolve_person(self, info, person_id):
        person_db_record = PersonModel.objects.get(pk=person_id)
        return PersonSchemaOutput(
        id = person_db_record.id,
        name= person_db_record.data["name"],
        age=person_db_record.data["age"],
        address_one=person_db_record.data["address_one"],
        address_two=person_db_record.data["address_two"],
        )


# class Query(ObjectType):
#     all_persons = List(PersonSchema)
#     person = Field(PersonSchema, person_id=Int())
#     def resolve_all_persons(self, info, **kwargs):
#         persons_set = PersonModel.objects.all()
#         # python shortcut for arrays
#         return [
#         PersonSchemaOutput(
#         id = person_db_record.id,
#         name= person_db_record.data["name"],
#         age=person_db_record.data["age"],
#         address_one=person_db_record.data["address_one"],
#         address_two=person_db_record.data["address_two"])
#         for person_db_record in persons_set
#         ]
#     def resolve_person(self, info, person_id):
#         person_db_record = PersonModel.objects.get(pk=person_id)
#         return PersonSchemaOutput(
#         id = person_db_record.id,
#         name= person_db_record.data["name"],
#         age=person_db_record.data["age"],
#         address_one=person_db_record.data["address_one"],
#         address_two=person_db_record.data["address_two"],
#         ) 


# class CreatePerson(graphene.Mutation):
#     class Arguments:
#         # input
#         person_data = PersonSchemaInputCreate(Required=True)
#         # output will be the created person
#         person = Field(PersonSchemaOutput)
#         ok = graphene.Boolean()
#         @staticmethod
#         def mutate(root, info, person_data=None):
#             ok = True
#         # Context: we don't do create for this flow, we do Update. Initially we put data in the DB for the schemas of bail fund so create is not widely used with attr libraries thus we didnot create mutation for create_schema yet
#         # first check the incoming data passes the dataclass 
#         # we cannot use structure as it is not Json
#         # add a constructor in your data class to make this easier to create an object
#             person_data_class = PersonDataClass(name=person_data.name, age=person_data.age, address_one=person_data.address_one, address_two=person_data.address_two)
#             # now create json_data
#             person_json_data = cattr.unstructure(person_data_class)
#             # create entry in DB
#             person_db_record = PersonModel(data=person_json_data)
#             person_db_record.save()
#             person_instance = PersonSchemaOutput(
#             id = person_db_record.id,
#             name= person_db_record.data["name"],
#             age=person_db_record.data["age"],
#             address_one=person_db_record.data["address_one"],
#             address_two=person_db_record.data["address_two"],
#             )
#             return CreatePerson(person=person_instance, ok=ok)


class UpdatePerson(graphene.Mutation):
    class Arguments:
        person_data = PersonSchemaInputUpdate()
        person = Field(PersonSchemaOutput)

        ok = graphene.Boolean()

        def mutate(root, info, person_data=None):

            ok = True

            person_db_record = PersonModel.objects.get(pk=person_data.id)
            if person_db_record:
                person_data_class = cattr.structure(person_db_record.data, PersonDataClass)
                # this is how you update values within a dataclass attr object and if any validation fails this will error out
                # right now we are 
                person_data_class = cattr.evolve(person_data_class, name=person_data.name,age=person_data.age)
                # no error on prev step means attr validation passed
                # now update the DB object for the specific record
                person_new_data_json = cattr.unstructure(person_data_class)
                person_db_record.data= person_new_data_json
                person_db_record.save()
                person_instance = PersonSchemaOutput(
                id = person_db_record.id,
                name= person_db_record.data["name"],
                age= person_db_record.data["age"],
                address_one=person_db_record.data["address_one"],
                address_two=person_db_record.data["address_two"],
                )
                return UpdatePerson(person=person_instance, ok=ok)
            return UpdatePerson(person=None, ok=ok)

class Mutation(ObjectType):
    # create_person = CreatePerson.Field()
    update_person = UpdatePerson.Field()
