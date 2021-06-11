import React, { useState } from "react";
import Button from '../../Button';
import ShowAddress from './ShowAddress';
import {iPerson} from '../../../shared/interfaces/people.interface'

interface iEditPersonProps {
  personState: iPerson;
  onCancel: () => void;
  onSave: (newName: string, newAge: number) => void;
}

const EditPerson: React.FC<iEditPersonProps> = ({personState, onCancel, onSave}) => {
    const [newName, setName] = useState(personState.name || "");
    const [newAge, setAge] = useState(personState.age || null);
    const [error, setError] = useState("");
    const [nameBorder, setNameBorder] = useState("green")
    const [ageBorder, setAgeBorder] = useState("green")

    const reset = () => {
        setName("");
        setAge(null);
    };

    const cancel = () => {
        reset();
        onCancel();
    };

    function validate() {
        if (newName === "") {
        setNameBorder("red")
        setError("Name cannot be blank");
        return;
        }

        if (newAge === null) {
        setAgeBorder("red")
        setError("Age cannot be blank")
        return;
        }
        
        if (newName !== "" && newAge !== null){
        setError("");
        onSave(newName, newAge)
        } 
    }

    return (
        <main className="grid grid-cols-5 items-center m-2">
        <section className="col-span-4 grid grid-cols-4 ">
            <form className="col-span-2 grid grid-cols-2" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
                <input
                className={`border-2 border-solid border-${nameBorder}-500 rounded text-center mx-2`}
                name="name"
                type="text"
                placeholder="Enter Name"
                value={newName || "" }
                data-testid="person-name-input"
                onChange={(event) => {
                    setName(event.target.value) 
                    setError("")
                }}
                />
            <input
                className={`border-2 border-solid border-${ageBorder}-500 rounded text-center mx-2`}
                name="age"
                type="number"
                placeholder="Enter Age"
                value={newAge || "" }
                data-testid="person-age-input"
                onChange={(event) => {
                    setAge(parseInt(event.target.value)) 
                    setError("")
                }}
                />
            </form>
            <ShowAddress address={personState.addressOne} />
                {/* {addressTwo ?  */}
                <ShowAddress address={personState.addressTwo} />
        </section>
        <section className="">
            <Button onClick={cancel} danger="true" color="secondary">
                Cancel
            </Button>
            <Button onClick={() => {
                validate()
            }} confirm="true" color="primary">
                Save
            </Button>
        </section>
        <div>{error}</div>
        </main>
    );
}

export default EditPerson;