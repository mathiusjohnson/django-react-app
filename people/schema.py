# from typing_extensions import Required
import graphene
import cattr
from graphene import Mutation, InputObjectType,ObjectType, String, Boolean, Field, Int, List, NonNull, ID, Argument
from .models import PersonModel
from .person import PersonDataClass



class PersonSchema(ObjectType):
    id = graphene.NonNull(Int),
    name = graphene.NonNull(String),
    age = graphene.NonNull(Int),
    address_one = graphene.NonNull(String),
    address_two = String

# class PersonSchema(ObjectType):
#     class Meta:
#         model = PersonSchema

class PersonSchemaOutput(PersonSchema, ObjectType):
# notice we only need ID in output and not in input of Mutation of Create
    id = graphene.ID
    pass


class PersonSchemaInputCreate(PersonSchema, InputObjectType):
    id = graphene.ID
    pass 


class PersonSchemaInputUpdate(InputObjectType):
# lets say we only allow update of following
    id = graphene.ID
    name = String,
    age = Int,
    pass

class CreatePerson(graphene.Mutation):
    ok = Boolean()

    class Arguments:
        first_name = graphene.String()
        age = graphene.Int()
        address_one = graphene.String()
        address_two = graphene.String()
        person_data = Argument(PersonSchemaInputCreate())
        # output will be the created person
        person = Argument(PersonSchemaOutput)
        ok = graphene.Boolean()
        
    @classmethod
    def mutate(self, info, person_data):
        person_data_class = PersonDataClass(name=person_data.name, age=person_data.age, address_one=person_data.address_one, address_two=person_data.address_two)
        # now create json_data
        person_json_data = cattr.unstructure(person_data_class)
        # create entry in DB
        person_db_record = PersonModel(data=person_json_data)
        person_db_record.save()
        person_instance = PersonSchemaOutput(
        id = person_db_record.id,
        name= person_db_record.data["name"],
        age=person_db_record.data["age"],
        address_one=person_db_record.data["address_one"],
        address_two=person_db_record.data["address_two"],
        )
        return CreatePerson(person=person_instance)

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


class Query(object):
    all_Persons = graphene.List(PersonSchema)
    person = Field(PersonSchema)
    ok = Boolean()

    @classmethod
    def mutate(cls, root, info, text, id):
        person = PersonSchema.objects.get(pk=id)
        person.text = text
        person.save()
        # Notice we return an instance of this mutation
        return Query(person=person)

    def resolve_all_Persons(self, info, **kwargs):
        person_set = PersonModel.objects.all()
        result = []
        for person_db in person_set:
            person_data_class = cattr.structure(person_db, PersonModel)
            result.append(PersonSchema)   

# class CreatePerson(graphene.Mutation):
#     class Arguments:
#         # input
#         person_data = PersonSchemaInputCreate(Required=True)
#         # output will be the created person
#         person = Argument(PersonSchemaOutput)
#         ok = graphene.Boolean()

#     @classmethod
#     def mutate(root, info, person_data=None):
#         ok = True
#         # Context: we don't do create for this flow, we do Update. Initially we put data in the DB for the schemas of bail fund so create is not widely used with attr libraries thus we didnot create mutation for create_schema yet
#         # first check the incoming data passes the dataclass 
#         # we cannot use structure as it is not Json
#         # add a constructor in your data class to make this easier to create an object
#         person_data_class = PersonDataClass(name=person_data.name, age=person_data.age, address_one=person_data.address_one, address_two=person_data.address_two)
#         # now create json_data
#         person_json_data = cattr.unstructure(person_data_class)
#         # create entry in DB
#         person_db_record = PersonModel(data=person_json_data)
#         person_db_record.save()
#         person_instance = PersonSchemaOutput(
#         id = person_db_record.id,
#         name= person_db_record.data["name"],
#         age=person_db_record.data["age"],
#         address_one=person_db_record.data["address_one"],
#         address_two=person_db_record.data["address_two"],
#         )
#         return CreatePerson(person=person_instance)


class UpdatePerson(graphene.Mutation):
    class Arguments:
        person_data = PersonSchemaInputUpdate()
        person = Argument(PersonSchemaOutput)

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
        
class Mutation(graphene.ObjectType):
    create_person = CreatePerson.Field()
    update_person = UpdatePerson.Field()