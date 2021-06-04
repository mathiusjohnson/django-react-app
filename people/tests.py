import pytest, logging
import sys
from graphene_django.utils.testing import GraphQLTestCase
from mixer.backend.django import mixer
from graphene.test import Client
from django.db.models import Model

from .person import PersonDataClass
from .schema import schema
import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

person_list_query = """
    query {
        allPersons {
            id
            name
        }
    }
"""
 
single_person_query = """
    query($id:ID!)
    {
        person(personId:$id) {
            id
            name
        }
    }
"""
 
create_person_mutation = """
     mutation CreatePerson($personData: PersonSchemaInputCreate!) {
        createPerson(personData: $personData) {
            person {
                id
                name 
                age
                addressOne{
                    street
                    city
                    region
                    country
                    postalCode
                }
                    addressTwo {
                    street
                    city
                    region
                    country
                    postalCode
                }
            }
            ok
        }
    }
"""
 
update_person_mutation = """
     mutation UpdatePerson($input: PersonSchemaInputUpdate!) {
        updatePerson(personData: $input) {
            person {
                id
                name
            }
            ok
        }
    }
"""
 
delete_person_mutation = """
    mutation DeletePerson($id: Int!) {
        deletePerson(personId: $id) {
            deletedId
        }
    }
"""


@pytest.mark.django_db
class TestPersonSchema(GraphQLTestCase):
    # def setUp(self):
    #     self.client = Client(schema)
    #     self.person = mixer.blend(PersonDataClass)

    def test_create_person(self):
        client = Client(schema)
        payload = {
            "name": "Joe Two", 
            "age": 22, 
            "addressOne": {
                "street": "38030 loggers lane", 
                "city": "Squamish", 
                "region": "BC", 
                "country": "Canada", 
                "postalCode": "v8b0z9"
            }, 
            "addressTwo": {
                "street": "38030 loggers lane", 
                "city": "Squamish", 
                "region": "BC", 
                "country": "Canada", 
                "postalCode": "v8b0z9"
            }
        }
 
        response = client.execute(create_person_mutation, variables={"personData": payload})
        person = response.get("data").get("createPerson").get("person")
        name = person.get("name")
        assert name == payload["name"]
 
    def test_update_person(self):
        client = Client(schema)

        personPayload = {
            "name": "Joe Two", 
            "age": 22, 
            "addressOne": {
                "street": "38030 loggers lane", 
                "city": "Squamish", 
                "region": "BC", 
                "country": "Canada", 
                "postalCode": "v8b0z9"
            },
            "addressTwo": {
                "street": "38030 loggers lane", 
                "city": "Squamish", 
                "region": "BC", 
                "country": "Canada", 
                "postalCode": "v8b0z9"
            }
        }
 
        createResponse = client.execute(create_person_mutation, variables={"personData": personPayload})
        person = createResponse.get("data").get("createPerson").get("person")
        personId = person.get("id")
        
        payload = {
            "id": personId,
            "name": "Justin"
        }
 
        response = client.execute(update_person_mutation, variables={"input": payload})
        print('response', response)
        response_person = response.get("data")
        name = response_person.get("name")
        assert name == payload["name"]
        assert name != person.name 
 
    # def test_delete_blog(self):
    #     payload = {
    #         "id": self.blog.id
    #     }
    #     response = self.client.execute(delete_blog_mutation, variables={"input": payload})
    #     ok = response.get("data").get("deleteBlog").get("ok")
    #     assert ok

    # def test_single_person_query(self):
    #     response = self.client.execute(single_person_query, variables={"id": self.person.id})
    #     response_person = response.get("data").get("person")
    #     assert response_person["id"] == str(self.person.id)
 
 
    # def test_person_list_query(self):
    #     mixer.blend(PersonModel)
    #     mixer.blend(PersonModel)
 
    #     response = self.client.execute(person_list_query)
    #     allPersons = response.get("data").get("allPersons")
    #     ok = response.get("data").get("ok")
         
    #     assert len(allPersons)

# if __name__ == "__main__":
#     logging.basicConfig( stream=sys.stderr )
#     logging.getLogger( "SomeTest.testSomething" ).setLevel( logging.DEBUG )
#     unittest.main()