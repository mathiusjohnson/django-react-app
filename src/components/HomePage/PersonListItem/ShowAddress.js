import React from 'react';

const ShowAddressOne = ({address}) => {

    console.log(address.street);
    if (address.street !== null) {
        const street = address.street
        const city = address.city
        const region = address.region
        const country = address.country
        const postalCode = address.postalCode
        return (
          <div>
            <p>{street}, {city}</p>
            <p>{region}, {country}, {postalCode}</p>
          </div>
        );
    } else {
        return <div></div>;
    }
};

export default ShowAddressOne;