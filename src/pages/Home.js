import React from 'react';
import { People } from '../components/PersonList';
import Header from '../components/Header';

const Home = () => {
    return (
        <div>
            <Header />
            <People />
        </div>
    );
};

export default Home;