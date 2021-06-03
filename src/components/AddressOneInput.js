import React from 'react';

const AddressOneInput = () => {
  return (
    <div className="flex flex-wrap col-span-1">
    <input
      className={`border-2 border-solid border-${addressBorder}-500 rounded text-center mx-2`}
      name="addressOne"
      type="text"
      placeholder="Enter Street"
      value={addressOneStreet || "" }
      onChange={(event) => {
        setAddressOneStreet(event.target.value) 
        addressBorder = "green"
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
        addressBorder = "green"
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
        addressBorder = "green"
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
        addressBorder = "green"
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
        addressBorder = "green"
        setError("")
      }}
    />
  </div>
  );
};

export default AddressOneInput;