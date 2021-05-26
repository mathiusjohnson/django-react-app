from people.models import PersonProperties
from attr import attrs, attrib
import cattr


@attrs
class Person(PersonProperties):
    name = attrib()
    age = attrib()
    address_one = attrib()
    address_two = attrib()
    @age.validator
    def _check_age(self, attribute, value):
        if value <=20:
            raise ValueError("age must be greater than 20")

    def structurePerson(json_data: any, person):
        person_object = cattr.structure(json_data, person)
        print(person_object)
        return person_object

    def UnstructurePerson(person):
        json_data = cattr.unstructure(person)
        print(json_data)
        return json_data