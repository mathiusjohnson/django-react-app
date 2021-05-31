import React, { useState } from "react";
import Button from '@material-ui/core/Button';

export default function EditPerson ({id, oldName, oldAge, onCancel, onSave}) {
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
    <main className="flex justify-between items-center m-2">
      <section className="">
        <form className="flex" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="w-full rounded"
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
          <section className="">{error}</section>
        <input
            className="w-full rounded"
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

      </section>
      <section className="">
        <section className="">
          <Button onClick={cancel} danger="true" color="secondary">
            Cancel
          </Button>
          <Button onClick={() => validate()} confirm="true" color="primary">
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}