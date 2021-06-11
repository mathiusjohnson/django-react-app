import cattr
import attr
import graphene
from graphene import Schema, Mutation, InputObjectType,ObjectType, String, Boolean, Field, Int, List, NonNull, ID, InputField
from .models import PersonModel
from .person import PersonDataClass
from .addressOne import AddressDataClass

class AddressSchemaOutput(ObjectType):
    street = String()
    city = String()
    region = String()
    country = String()
    postalCode = String()

class PersonSchemaOutput(ObjectType):
    id = NonNull(ID)
    name = NonNull(String)
    age = NonNull(Int)
    address_one = NonNull(AddressSchemaOutput)
    address_two = graphene.Field(AddressSchemaOutput)

class AddressSchemaInputCreate(InputObjectType):
    street = String()
    city = String()
    region = String()
    country = String()
    postalCode = String()

class PersonSchemaInputCreate(InputObjectType):
    name = NonNull(String)
    age = NonNull(Int)
    address_one = NonNull(AddressSchemaInputCreate)
    address_two = graphene.InputField(AddressSchemaInputCreate)

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
        name = person_db_record.data["name"],
        age = person_db_record.data["age"],
        address_one = AddressSchemaOutput(
            street=person_db_record.data["address_one"]["street"],
            city=person_db_record.data["address_one"]["city"],
            region=person_db_record.data["address_one"]["region"],
            country=person_db_record.data["address_one"]["country"],
            postalCode=person_db_record.data["address_one"]["postalCode"]
        ),
        address_two = AddressSchemaOutput(
            street=person_db_record.data["address_two"]["street"] if isinstance(person_db_record.data["address_two"], dict) else None,
            city=person_db_record.data["address_two"]["city"] if isinstance(person_db_record.data["address_two"], dict) else None,
            region=person_db_record.data["address_two"]["region"] if isinstance(person_db_record.data["address_two"], dict) else None,
            country=person_db_record.data["address_two"]["country"] if isinstance(person_db_record.data["address_two"], dict) else None,
            postalCode=person_db_record.data["address_two"]["postalCode"] if isinstance(person_db_record.data["address_two"], dict) else None
        ) 
        )

        for person_db_record in persons_set
        ]

    def resolve_person(self, _, person_id):
        person_db_record = PersonModel.objects.get(pk=person_id)
        return PersonSchemaOutput(
        id = person_db_record.id,
        name= person_db_record.data["name"],
        age=person_db_record.data["age"],
        address_one=AddressSchemaOutput(
            street=person_db_record.data["address_one"]["street"],
            city=person_db_record.data["address_one"]["city"],
            region=person_db_record.data["address_one"]["region"],
            country=person_db_record.data["address_one"]["country"],
            postalCode=person_db_record.data["address_one"]["postalCode"]
        ),
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
        # first check the incoming data passes the dataclass
        # we cannot use structure as it is not Json
        # add a constructor in your data class to make this easier to create an object
        dataName = person_data.name
        dataAge = person_data.age

        dataAddressOne = person_data.address_one
        dAddOneStreet = dataAddressOne.street
        dAddOneCity = dataAddressOne.city
        dAddOneRegion = dataAddressOne.region
        dAddOneCountry = dataAddressOne.country
        dAddOnePostalCode = dataAddressOne.postalCode
        # print(person_data)

        dataAddressTwo = person_data.address_two

        if dataAddressTwo and dataAddressTwo.street and dataAddressTwo.city and dataAddressTwo.region and dataAddressTwo.country and dataAddressTwo.postalCode:
            # print('address two checks out')

            dAddTwoStreet = dataAddressTwo.street
            dAddTwoCity = dataAddressTwo.city
            dAddTwoRegion = dataAddressTwo.region
            dAddTwoCountry = dataAddressTwo.country
            dAddTwoPostalCode = dataAddressTwo.postalCode

            address_one = AddressDataClass(
                    street=dAddOneStreet,
                    city=dAddOneCity,
                    region=dAddOneRegion,
                    country=dAddOneCountry,
                    postalCode=dAddOnePostalCode
            )

            address_two = AddressDataClass(
                    street=dAddTwoStreet,
                    city=dAddTwoCity,
                    region=dAddTwoRegion,
                    country=dAddTwoCountry,
                    postalCode=dAddTwoPostalCode
            )

            person_data_class = PersonDataClass(
                name=dataName, 
                age=dataAge, 
                address_one=address_one, 
                address_two=address_two
            )
        else:
            # print('only one address checks out')
            # print(dataName, dataAge)

            address_one = AddressDataClass(
                    street=dAddOneStreet,
                    city=dAddOneCity,
                    region=dAddOneRegion,
                    country=dAddOneCountry,
                    postalCode=dAddOnePostalCode
            )

            person_data_class = PersonDataClass(
                name=dataName, 
                age=dataAge, 
                address_one=address_one, 
            )

            # print(person_data_class)
        # now create json_data
        person_json_data = cattr.unstructure(person_data_class)
        # create entry in DB
        person_db_record = PersonModel(data=person_json_data)
        # print('address one after data class created: ', person_db_record.data["address_one"])
        person_db_record.save()
        person_instance = PersonSchemaOutput(
            id = person_db_record.id,
            name= person_db_record.data["name"],
            age=person_db_record.data["age"],
            address_one=person_db_record.data["address_one"],
            address_two=person_db_record.data["address_two"],
            )
        return CreatePerson(person=person_instance, ok=True)


class UpdatePerson(Mutation):
    class Arguments:
        person_data = PersonSchemaInputUpdate()

    person = Field(PersonSchemaOutput)
    ok = Boolean()

    def mutate(root, _, person_data=None):
        # print('person data in update: ', person_data)
        person_db_record = PersonModel.objects.get(pk=person_data.id)
        # print('db record: ', person_db_record.data)
        if person_db_record:
            # print('db record checks out!!!!!')
            cattr.register_structure_hook(PersonDataClass, lambda d, t: PersonDataClass(**d))

            person_data_class = cattr.structure(person_db_record.data, PersonDataClass,)
            print('data class structured: ', person_data_class)
            # this is how you update values within a dataclass attr object and if any validation fails this will error out
            # right now we are
            person_data_class = attr.evolve(person_data_class, name=person_data.name,age=person_data.age, )
            # print('data class evolved: ', person_data_class)
            # no error on prev step means attr validation passed
            # now update the DB object for the specific record
            person_new_data_json = cattr.unstructure(person_data_class)
            # print('new data json: ', person_new_data_json)

            person_db_record.data= person_new_data_json
            # print('before saving to db: ', person_db_record.data)
            person_db_record.save()
            person_instance = PersonSchemaOutput(
                id = person_db_record.id,
                name= person_db_record.data["name"],
                age= person_db_record.data["age"],
                address_one=person_db_record.data["address_one"],
                address_two=person_db_record.data["address_two"],
                )
            # print('person instance: ', person_db_record)
            return UpdatePerson(person=person_instance, ok=True)
        return UpdatePerson(person=None, ok=False)


class DeletePerson(Mutation):
  class Arguments:
    # The input arguments for this mutation
    id = ID()

  # The class attributes define the response of the mutation
  person = Field(PersonSchemaOutput)

  deleted_id = Int()
  def mutate(self, info, id):
    person = PersonModel.objects.get(pk=id)
    if person is not None:
      person.delete()
    return DeletePerson(deleted_id=id)

class Mutations(ObjectType):
    create_person = CreatePerson.Field()
    update_person = UpdatePerson.Field()
    delete_person = DeletePerson.Field()

schema = Schema(query=Query, mutation=Mutations)
