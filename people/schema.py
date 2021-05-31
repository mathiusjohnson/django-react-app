import cattr
import attr
from graphene import Schema, Mutation, InputObjectType,ObjectType, String, Boolean, Field, Int, List, NonNull, ID
from .models import PersonModel
from .person import PersonDataClass

class PersonSchemaOutput(ObjectType):
    id = NonNull(ID)
    name = NonNull(String)
    age = NonNull(Int)
    address_one = NonNull(String)
    address_two = NonNull(String)

class PersonSchemaInputCreate(InputObjectType):
    name = String()
    age = Int()
    address_one = String()
    address_two = String()

class PersonSchemaInputUpdate(InputObjectType):
# lets say we only allow update of following
    id = ID()
    name = String()
    age = Int()

class Query(ObjectType):
    all_persons = List(PersonSchemaOutput)
    person = Field(PersonSchemaOutput, person_id=Int())

    def resolve_all_persons(self, _, **kwargs):
        persons_set = PersonModel.objects.all()
        return [
        PersonSchemaOutput(
        id = person_db_record.id,
        name= person_db_record.data["name"],
        age=person_db_record.data["age"],
        address_one=person_db_record.data["address_one"],
        address_two=person_db_record.data["address_two"])
        for person_db_record in persons_set
        ]

    def resolve_person(self, _, person_id):
        person_db_record = PersonModel.objects.get(pk=person_id)
        return PersonSchemaOutput(
        id = person_db_record.id,
        name= person_db_record.data["name"],
        age=person_db_record.data["age"],
        address_one=person_db_record.data["address_one"],
        address_two=person_db_record.data["address_two"],
        )



class CreatePerson(Mutation):
    class Arguments:
        # input
        person_data = PersonSchemaInputCreate()
        # output will be the created person
    person = Field(PersonSchemaOutput)
    ok = Boolean()
    def mutate(root, _, person_data=None):
        # Context: we don't do create for this flow, we do Update. Initially we put data in the DB for the schemas of bail fund so create is not widely used with attr libraries thus we didnot create mutation for create_schema yet
        # first check the incoming data passes the dataclass
        # we cannot use structure as it is not Json
        # add a constructor in your data class to make this easier to create an object
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
        print("THIS IS THE PRINT: ", person_data, person_instance)
        return CreatePerson(person=person_instance, ok=True)


class UpdatePerson(Mutation):
    class Arguments:
        person_data = PersonSchemaInputUpdate()

    person = Field(PersonSchemaOutput)
    ok = Boolean()

    def mutate(root, _, person_data=None):
        person_db_record = PersonModel.objects.get(pk=person_data.id)
        if person_db_record:
            person_data_class = cattr.structure(person_db_record.data, PersonDataClass)
            # this is how you update values within a dataclass attr object and if any validation fails this will error out
            # right now we are
            person_data_class = attr.evolve(person_data_class, name=person_data.name,age=person_data.age)
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
            return UpdatePerson(person=person_instance, ok=True)
        return UpdatePerson(person=None, ok=False)

class Mutations(ObjectType):
    create_person = CreatePerson.Field()
    update_person = UpdatePerson.Field()


schema = Schema(query=Query, mutation=Mutations)
