import React, { useState } from "react";
import Button from '@material-ui/core/Button';

export default function EditPerson ({id, oldName, oldAge, onCancel, onSave, addressOne, addressTwo}) {
  const [name, setName] = useState(oldName || "");
  const [age, setAge] = useState(oldAge || "");
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setAge(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  function validate() {
    if (name === "") {
      setError("Name cannot be blank");
      return;
    }
    if (age === null) {
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
        <form className="col-span-2 flex justify-between" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <div>
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
          </div>
          <div className="">{error}</div>
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
              data-testid=""
              rows="4"
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