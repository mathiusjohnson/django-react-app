import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { useMutation } from 'urql';
import useVisualMode from '../hooks/useVisualMode'

const SHOW = "SHOW";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";

const CREATE_PERSON_QUERY = `
mutation ($name: String!, $age: Int!, $addressOne: String!, $addressTwo: String) {
  createPerson(personData: {name: $name, age: $age, addressOne: $addressOne, addressTwo: $addressTwo}) {
    person {
      name 
      age
    	addressOne
    	addressTwo
    }
  }
}
`

export default function CreatePerson ({back}) {
  const { transition } = useVisualMode(SHOW);

  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [addressOne, setAddressOne] = useState();
  const [addressTwo, setAddressTwo] = useState();
  const [error, setError] = useState();

  const [createPersonResult, createPerson] = useMutation(CREATE_PERSON_QUERY);

  const reset = () => {
    setName("");
    setAge(null);
  };

  const cancel = () => {
    reset();
    back();
  };

  function save(newName, newAge) {


    const variables = { name: newName || '', age: newAge || '', addressOne: addressOne || '', addressTwo: addressTwo || '' };

    transition(SAVING);
    createPerson(variables)
        .then(result => {
            console.log(result);
            if (result.error) {
                console.error('Oh no!', result.error);
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

  const [nameBorder, setNameBorder] = useState("green")
  const [ageBorder, setAgeBorder] = useState("green")
  const [addressBorder, setAddressBorder] = useState("green")

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

    if (addressOne === undefined) {
      setAddressBorder("red")
      setError("Address Line One cannot be blank")
      return;
    }

    if (name !== undefined && age !== undefined && addressOne !== undefined){
      setError("");
      save(name, age, addressOne, addressTwo)
    } 
  }

  if (!createPersonResult.fetching) {
    return (
      <main className="grid grid-cols-5 items-center m-2">
          <form className="col-span-4 grid grid-cols-4" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
  
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
  
            <input
              className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
              name="addressOne"
              type="text"
              placeholder="Address One"
              value={addressOne || "" }
              onChange={(event) => {
                setAddressOne(event.target.value) 
                addressBorder = "green"
                setError("")
              }}
            />
  
            <input
              className="border-2 border-solid border-green-500 rounded text-center mx-2"
              name="addressTwo"
              type="text"
              placeholder="Address Two"
              value={addressTwo || "" }
              onChange={(event) => {
                setAddressTwo(event.target.value) 
                setError("")
              }}
            />
  
  
          </form>
        <section className="">
            <Button onClick={cancel} danger="true" color="secondary">
              Cancel
            </Button>
            <Button onClick={() => validate()} confirm="true" color="primary">
              Save
            </Button>
        </section>
        <div className="col-span-5 text-red-500"> {error}</div>
      </main>
    );
  } else {
    return (
      <div>Adding Person...</div>
    )
  }
}