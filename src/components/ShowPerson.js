import React from 'react';
import Button from '@material-ui/core/Button';

const ShowPerson = ({personState, addressOne, addressTwo, onEditClicked}) => {
  return (
      <div className="grid grid-cols-5 items-center m-2">
          <p>{personState.name}</p>
          <span>{personState.age}</span>
          <p>{addressOne || ""}</p>
          <p>{addressTwo || ""}</p>
          <div>
          <Button onClick={() => onEditClicked()} variant="contained" color="primary">
              Edit
          </Button>
          </div>
      </div>
  );
};

export default ShowPerson;