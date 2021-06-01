import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { useMutation } from 'urql';
import useVisualMode from '../hooks/useVisualMode'

const SHOW = "SHOW";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";

const CREATE_PERSON_QUERY = `
mutation ($name: String!, $age: Int!, $streetOne: String!, $cityOne: String!, $regionOne: String!, $countryOne: String!, $postalCodeOne: String!, $streetTwo: String!, $cityTwo: String!, $regionTwo: String!, $countryTwo: String!, $postalCodeTwo: String!) {
   createPerson(personData: {
     name: $name, 
     age: $age, 
     addressOne: {
     	street: $streetOne, 
       city: $cityOne, 
       region: $regionOne, 
       country: $countryOne, 
       postalCode: $postalCodeOne
     }, 
     addressTwo: {
     	street: $streetTwo, 
       city: $cityTwo, 
       region: $regionTwo, 
       country: $countryTwo, 
       postalCode: $postalCodeTwo
     }
   }) {
     person {
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
   }
}
`

export default function CreatePerson ({back}) {
  const { transition } = useVisualMode(SHOW);

  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [addressOneStreet, setAddressOneStreet] = useState();
  const [addressOneCity, setAddressOneCity] = useState();
  const [addressOneRegion, setAddressOneRegion] = useState();
  const [addressOneCountry, setAddressOneCountry] = useState();
  const [addressOnePostal, setAddressOnePostal] = useState();
  const [addressTwoStreet, setAddressTwoStreet] = useState();
  const [addressTwoCity, setAddressTwoCity] = useState();
  const [addressTwoRegion, setAddressTwoRegion] = useState();
  const [addressTwoCountry, setAddressTwoCountry] = useState();
  const [addressTwoPostal, setAddressTwoPostal] = useState();  const [nameBorder, setNameBorder] = useState("gray")
  const [ageBorder, setAgeBorder] = useState("gray")
  const [addressBorder, setAddressBorder] = useState("gray")
  const [error, setError] = useState();

  const [createPersonResult, createPerson] = useMutation(CREATE_PERSON_QUERY);

  const reset = () => {
    setName("");
    setAge(null)
  };

  const cancel = () => {
    reset();
    back();
  };

  function save(newName, newAge) {
    console.log('save!!!');

    const variables = { 
      name: newName || '', 
      age: newAge || '', 
      streetOne: addressOneStreet,
      cityOne: addressOneCity,
      regionOne: addressOneRegion,
      countryOne: addressOneCountry,
      postalCodeOne: addressOnePostal,
      streetTwo: addressTwoStreet,
      cityTwo: addressTwoCity,
      regionTwo: addressTwoRegion,
      countryTwo: addressTwoCountry,
      postalCodeTwo: addressTwoPostal   
    };

    console.log(variables);
    transition(SAVING);
    createPerson(variables)
        .then(result => {
            console.log(result);
            if (result.error) {
                console.error('Oh no!', result.error.message);
                setError(result.error.message.replace("[GraphQL]", ""))
                return
            } else {
                const newPerson = result.data.updatePerson.person
                createPerson(newPerson)
            }
        })
        .then(() => transition(SHOW))
        .catch((error) =>{
            transition(ERROR_SAVE, true);
        }) 
  }

  function validate() {
    if (name === undefined) {
      setNameBorder("red")
      setError("Name cannot be blank");
      return;
    }

    if (age === undefined) {
      setAgeBorder("red")
      setError("Age cannot be blank")
      return;
    }

    // if (addressOneStreet === undefined) {
    //   setAddressBorder("red")
    //   setError("Address Line One cannot be blank")
    //   return;
    // }
    // if (addressOneStreet === undefined) {
    //   setAddressBorder("red")
    //   setError("Address Line One cannot be blank")
    //   return;
    // }
    // if (addressOneStreet === undefined) {
    //   setAddressBorder("red")
    //   setError("Address Line One cannot be blank")
    //   return;
    // }


    if (name !== undefined && age !== undefined && addressOneStreet !== undefined){
      console.log('validated!');
      setError("");
      save(name, age)
    } 
  }

  if (!createPersonResult.fetching) {
    return (
      <main className="grid grid-cols-7 items-center m-2 mt-4">
          <form className="col-span-6 grid grid-cols-6" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
            <div className="space-y-2">
              <label htmlFor="nameAge">Name and Age</label>
              <input
                className={`border-2 border-solid border-${nameBorder}-500 rounded text-center mx-2`}
                name="name"
                type="text"
                placeholder="Enter Name"
                value={name || "" }
                onChange={(event) => {
                  setName(event.target.value) 
                  setNameBorder("green")
                  setError("")
                }}
                data-testid=""
              />
    
              <input
                className={`border-2 border-solid border-${ageBorder}-500 rounded text-center mx-2`}
                name="age"
                type="number"
                placeholder="Enter age"
                value={age || "" }
                onChange={(event) => {
                  setAge(event.target.value) 
                  setAgeBorder("green")
                  setError("")
                }}
              />
            </div>

            <div className="flex flex-wrap col-span-2 space-y-2">

              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressOne"
                type="text"
                placeholder="Enter Street"
                value={addressOneStreet || "" }
                onChange={(event) => {
                  setAddressOneStreet(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressOne"
                type="text"
                placeholder="Enter City"
                value={addressOneCity || "" }
                onChange={(event) => {
                  setAddressOneCity(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressOne"
                type="text"
                placeholder="Enter Region"
                value={addressOneRegion || "" }
                onChange={(event) => {
                  setAddressOneRegion(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressOne"
                type="text"
                placeholder="Enter Country"
                value={addressOneCountry || "" }
                onChange={(event) => {
                  setAddressOneCountry(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressOne"
                type="text"
                placeholder="Enter Postal Code"
                value={addressOnePostal || "" }
                onChange={(event) => {
                  setAddressOnePostal(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
            </div>
  
            <div className="flex flex-wrap col-span-2 space-y-2">
              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressTwo"
                type="text"
                placeholder="Enter Street"
                value={addressTwoStreet || "" }
                onChange={(event) => {
                  setAddressTwoStreet(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressTwo"
                type="text"
                placeholder="Enter City"
                value={addressTwoCity || "" }
                onChange={(event) => {
                  setAddressTwoCity(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressTwo"
                type="text"
                placeholder="Enter Region"
                value={addressTwoRegion || "" }
                onChange={(event) => {
                  setAddressTwoRegion(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressTwo"
                type="text"
                placeholder="Enter Country"
                value={addressTwoCountry || "" }
                onChange={(event) => {
                  setAddressTwoCountry(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
              <input
                className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
                name="addressTwo"
                type="text"
                placeholder="Enter Postal Code"
                value={addressTwoPostal || "" }
                onChange={(event) => {
                  setAddressTwoPostal(event.target.value) 
                  setAddressBorder("green")
                  setError("")
                }}
              />
            </div>
  
  
          </form>
        <div className="">
            <Button onClick={cancel} danger="true" color="secondary">
              Cancel
            </Button>
            <Button onClick={() => validate()} confirm="true" color="primary">
              Save
            </Button>
        </div>
        <div className="col-span-5 text-red-500"> {error}</div>
      </main>
    );
  } else {
    return (
      <div>Adding Person...</div>
    )
  }
}