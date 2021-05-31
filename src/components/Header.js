import React from 'react';

const Header = () => {
  return (
    <div className="grid grid-cols-5 m-2">
      <div className="grid grid-cols-4 col-span-4">
        <p>Name</p>
        <p>Age</p>
        <p>Address One</p>
        <p>Address Two</p>
      </div>
      <div>
        Actions
      </div>
    </div>
  );
};

export default Header;