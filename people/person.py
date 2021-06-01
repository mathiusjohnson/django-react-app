from attr import attrs, attrib
import cattr
from attr.validators import (
    instance_of,
    optional,
)
from typing import Optional

@attrs
class PersonDataClass:
    name: Optional[str] = attrib(
        default=None, 
        validator=optional(instance_of(str))
    )

    age: Optional[int] = attrib(
        default=None, 
        validator=optional(instance_of(int))
    )

    address_one: Optional[object] = attrib(
        default=None, 
        validator=optional(instance_of(object))
    )

    address_two: Optional[object] = attrib(
        default=None, 
        validator=optional(instance_of(object))
    )

    @age.validator
    def _check_age(self, _, value):
        if value and value <=20:
            raise ValueError("Age must be greater than 20")

    @name.validator
    def _check_name(self, _, value):
        if len(value) < 1:
            raise ValueError("Name cannot be blank")