import React from 'react';
import PersonListItem from './PersonListItem';
import { iPersonListItemProps } from '../../../shared/interfaces/people.interface';



const index: React.FC<iPersonListItemProps> = ({person, refresh}) => {
  return (
    <div>
      <PersonListItem refresh={refresh} person={person} />
    </div>
  );
};

export default index;