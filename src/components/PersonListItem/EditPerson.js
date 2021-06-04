import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import ShowAddress from './ShowAddress';

export default function EditPerson ({personState, onCancel, onSave}) {
    const [name, setName] = useState(personState.name || "");
    const [age, setAge] = useState(personState.age || "");
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
        
        if (name !== "" && age !== null){
        setError("");
        onSave(name, age)
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
                value={name || "" }
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
                placeholder="Enter age"
                value={age || "" }
                data-testid="person-age-input"
                onChange={(event) => {
                    setAge(event.target.value) 
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
            <button onClick={() => validate()} confirm="true" color="primary">
                Save
            </button>
        </section>
        </main>
    );
}