import React, { useState } from "react";
import Button from '@material-ui/core/Button';

export default function EditPerson ({id, oldName, oldAge, onCancel, onSave, addressOne, addressTwo}) {
  const [name, setName] = useState(oldName || "");
  const [age, setAge] = useState(oldAge || "");
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
              onChange={(event) => {
                setName(event.target.value) 
                setError("")
              }}
              data-testid=""
            />
          <input
              className={`border-2 border-solid border-${ageBorder}-500 rounded text-center mx-2`}
              name="name"
              type="number"
              placeholder="Enter age"
              value={age || "" }
              onChange={(event) => {
                setAge(event.target.value) 
                setError("")
              }}
            />
          </form>
        <p>{addressOne}</p>
        <p>{addressTwo}</p>
      </section>
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
}