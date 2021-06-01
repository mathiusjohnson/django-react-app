import React from 'react';
import PersonListItem from './PersonListItem';

const index = ({person, refresh}) => {
  return (
    <div>
      <PersonListItem refresh={refresh} person={person} />
    </div>
  );
};

export default index;