from attr import attrs, attrib
import cattr
from attr.validators import (
    instance_of,
    optional,
)
from typing import Optional

@attrs
class AddressOneDataClass:
    street: Optional[str] = attrib(default=None, validator=optional(instance_of(str)))
    city: Optional[str] = attrib(default=None, validator=optional(instance_of(str)))
    region: Optional[str] = attrib(default=None, validator=optional(instance_of(str)))
    country: Optional[str] = attrib(default=None, validator=optional(instance_of(str)))
    postalCode: Optional[str] = attrib(default=None, validator=optional(instance_of(str)))

    # https://stackoverflow.com/questions/11832400/validate-postal-code
 
    @street.validator
    def _check_street(self, _, value):
        if value and len(value) < 1:
            raise ValueError("Street cannot be blank")

    @city.validator
    def _check_city(self, _, value):
        if value and len(value) < 1:
            raise ValueError("City cannot be blank")

    @region.validator
    def _check_region(self, _, value):
        if value and len(value) < 1:
            raise ValueError("Region cannot be blank")
    @country.validator
    def _check_country(self, _, value):
        if value and len(value) < 1:
            raise ValueError("Country cannot be blank")

    @postalCode.validator
    def _check_postal(self, _, value):
        if value:
            value = value.upper().replace(" ", "")
        if value and len(value) == 6:
            for i in range(len(value)):
                if i % 2 == 0:
                    #Even index (0, 2, 4, 6...) , havalue to be 'letter'
                    if not(value[i].isalpha()):
                        raise ValueError("Please enter a valid postal code")
                else:
                    #Odd index (1, 3, 5, 7...), must be 'number'
                    if not(value[i].isdigit()):
                        raise ValueError("Please enter a valid postal code")


        else:
          #You can save some cpu ticks here... at this point, the string has to be of length 6 or you know it's not a zip
            raise ValueError("Please enter a valid postal code")
