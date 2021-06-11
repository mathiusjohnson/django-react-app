import React from 'react';
import { iAddress } from '../../../shared/interfaces/people.interface'

interface iShowAddressProps {
  address?: iAddress
}

const ShowAddress: React.FC<iShowAddressProps> = ({address}) => {

    if (address?.street !== null) {
        const street = address?.street
        const city = address?.city
        const region = address?.region
        const country = address?.country
        const postalCode = address?.postalCode
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

export default ShowAddress;