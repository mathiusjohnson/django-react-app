import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { useMutation } from 'urql';
import useVisualMode from '../hooks/useVisualMode'

const SHOW = "SHOW";
const SAVING = "SAVING";

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
    })  {
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
  const [addressTwoPostal, setAddressTwoPostal] = useState();  
  const [nameBorder, setNameBorder] = useState("gray")
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

  function save() {

    const variables = { 
      name: name || '', 
      age: age || '', 
      streetOne: addressOneStreet || '',
      cityOne: addressOneCity || '',
      regionOne: addressOneRegion || '',
      countryOne: addressOneCountry || '',
      postalCodeOne: addressOnePostal || '',
      streetTwo: addressTwoStreet || '',
      cityTwo: addressTwoCity || '',
      regionTwo: addressTwoRegion || '',
      countryTwo: addressTwoCountry || '',
      postalCodeTwo: addressTwoPostal || ''   
    };

    console.log(variables);
    transition(SAVING);
    createPerson(variables)
        .then(result => {
            console.log('result: ', result);
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
        .catch((error) => {
            console.log('error: ', error);
        }) 
  }

  if (!createPersonResult.fetching) {
    return (
      <main className="items-center m-2 mt-4">
            <form className="grid grid-cols-6" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
                <div className="col-span-6">
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    className={`border-2 border-solid border-${nameBorder}-500 rounded text-center mx-2`}
                    name="personName"
                    type="text"
                    placeholder="Enter Name"
                    value={name || "" }
                    onChange={(event) => {
                    setName(event.target.value) 
                    setNameBorder("green")
                    setError("")
                    }}
                    data-testid="name"
                />
                <label htmlFor="name">Age:</label>
                <input
                    id="age"
                    data-testid="age"
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

                <div className="flex flex-wrap justify-center col-span-3">
                <div className="w-full">Address One:</div>
                    <div>
                    <input
                        id="streetOne"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="streetOne"
                        type="text"
                        placeholder="Enter Street"
                        value={addressOneStreet || "" }
                        onChange={(event) => {
                        setAddressOneStreet(event.target.value) 
                        setAddressBorder("green")
                        setError("")
                        }}
                    />
                    </div>
                    <div>
                    <input
                        id="cityOne"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="cityOne"
                        type="text"
                        placeholder="Enter City"
                        value={addressOneCity || "" }
                        onChange={(event) => {
                        setAddressOneCity(event.target.value) 
                        setAddressBorder("green")
                        setError("")
                        }}
                    />
                    </div>
                    <div>
                    <input
                        id="regionOne"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="regionOne"
                        type="text"
                        placeholder="Enter Region"
                        value={addressOneRegion || "" }
                        onChange={(event) => {
                        setAddressOneRegion(event.target.value) 
                        setAddressBorder("green")
                        setError("")
                        }}
                    />
                    </div>
                    <div>
                    <input
                        id="countryOne"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="countryOne"
                        type="text"
                        placeholder="Enter Country"
                        value={addressOneCountry || "" }
                        onChange={(event) => {
                        setAddressOneCountry(event.target.value) 
                        setAddressBorder("green")
                        setError("")
                        }}
                    />
                    </div>
                    <div>
                    <input
                        id="postalCodeOne"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="postalCodeOne"
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
                </div>
    
                <div className="flex flex-wrap justify-center col-span-3">
                <div className="w-full">Address Two (Optional):</div>

                <div>
                    <input
                        id="streetTwo"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="streetTwo"
                        type="text"
                        placeholder="Enter Street"
                        value={addressTwoStreet || "" }
                        onChange={(event) => {
                            setAddressTwoStreet(event.target.value) 
                            setAddressBorder("green")
                            setError("")
                        }}
                    />
                </div>
                <div>
                    <input
                        id="cityTwo"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="cityTwo"
                        type="text"
                        placeholder="Enter City"
                        value={addressTwoCity || "" }
                        onChange={(event) => {
                            setAddressTwoCity(event.target.value) 
                            setAddressBorder("green")
                            setError("")
                        }}
                    />
                </div>
                <div>
                    <input
                        id="regionTwo"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="regionTwo"
                        type="text"
                        placeholder="Enter Region"
                        value={addressTwoRegion || "" }
                        onChange={(event) => {
                            setAddressTwoRegion(event.target.value) 
                            setAddressBorder("green")
                            setError("")
                        }}
                    />
                </div>
                <div>
                    <input
                        id="countryTwo"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="countryTwo"
                        type="text"
                        placeholder="Enter Country"
                        value={addressTwoCountry || "" }
                        onChange={(event) => {
                            setAddressTwoCountry(event.target.value) 
                            setAddressBorder("green")
                            setError("")
                        }}
                    />
                </div>
                <div>
                    <input
                        id="postalCodeTwo"
                        className={`border-2 border-solid border-${addressBorder}-500 rounded text-center m-1`}
                        name="postalCodeTwo"
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
                </div>
        
                <div className="col-span-7">
                    <Button 
                        onClick={cancel} danger="true" color="secondary">
                            Cancel
                    </Button>
                    <button 
                        id="savebutton"
                        onClick={() => save()} confirm="true" color="primary">
                        Save
                    </button>
                </div>
            </form>
        <div className="col-span-5 text-red-500"> {error}</div>
      </main>
    );
  } else {
    return (
      <div>Adding Person...</div>
    )
  }
}