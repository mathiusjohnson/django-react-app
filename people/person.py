from attr import attrs, attrib
import cattr
from attr.validators import (
    instance_of,
    optional,
)
from typing import Optional

@attrs
class PersonDataClass():
    name: Optional[str] = attrib(default=None, validator=optional(instance_of(str)))
    age: Optional[str] = attrib(default=None, validator=optional(instance_of(int)))
    address_one: Optional[str] = attrib(default=None, validator=optional(instance_of(str)))
    address_two: Optional[str] = attrib(default=None, validator=optional(instance_of(str)))
    @age.validator
    def _check_age(self, _, value):
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