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

  function validate() {
    if (name === "") {
      setError("Name cannot be blank");
      return;
    }

    if (age === null) {
      setError("Age cannot be blank")
      return;
    }

    if (addressOne === null) {
      setError("Address Line One cannot be blank")
      return;
    }

    if (name !== "" && age !== null){
      setError("");
      save(name, age, addressOne, addressTwo)
    } 
  }

  if (!createPersonResult.fetching) {
    return (
      <main className="grid grid-cols-5 items-center m-2">
          <form className="col-span-4 grid grid-cols-4" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
  
            <input
              className="border-2 border-solid border-green-500 rounded text-center mx-2"
              name="name"
              type="text"
              placeholder="Enter Name"
              value={name || "" }
              onChange={(event) => {
                setName(event.target.value) 
                setError("")
              }}
              data-testid=""
            />
  
            <input
              className="border-2 border-solid border-green-500 rounded text-center mx-2"
              name="name"
              type="number"
              placeholder="Enter age"
              value={age || "" }
              onChange={(event) => {
                setAge(event.target.value) 
                setError("")
              }}
            />
  
            <input
              className="border-2 border-solid border-green-500 rounded text-center mx-2"
              name="addressOne"
              type="text"
              placeholder="Address One"
              value={addressOne || "" }
              onChange={(event) => {
                setAddressOne(event.target.value) 
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
  
            <div className="">{error}</div>
  
          </form>
        <section className="">
            <Button onClick={cancel} danger="true" color="secondary">
              Cancel
            </Button>
            <Button onClick={() => validate()} confirm="true" color="primary">
              Save
            </Button>
        </section>
      </main>
    );
  } else {
    return (
      <div>Adding Person...</div>
    )
  }
}