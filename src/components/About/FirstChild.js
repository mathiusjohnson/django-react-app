import React from 'react';
import SecondChild from './SecondChild';

const FirstChild = () => {
    return (
        <div>
            First Child no props
            <SecondChild />
        </div>
    );
};

export default FirstChild;