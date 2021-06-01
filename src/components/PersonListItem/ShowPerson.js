import React from 'react';
import Button from '@material-ui/core/Button';
import ShowAddress from './ShowAddress';

const ShowPerson = ({personState, addressOne, addressTwo, onEditClicked}) => {
  return (
      <div className="grid grid-cols-5 items-center m-2">
          <p>{personState.name}</p>
          <span>{personState.age}</span>
          <ShowAddress address={addressOne} />
          {addressTwo ? 
          <ShowAddress address={addressTwo} />
            : ""
          }
          <div>
          <Button onClick={() => onEditClicked()} variant="contained" color="primary">
              Edit
          </Button>
          </div>
      </div>
  );
};

export default ShowPerson;