import React from 'react';
import PersonListItem from './PersonListItem';

const index = ({person}) => {
  return (
    <div>
      <PersonListItem person={person} />
    </div>
  );
};

export default index;