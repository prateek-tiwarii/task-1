

import React from 'react';
import Stats from '../components/Stats';

import AllLabs from './DisplayLabs';

const Dashboard = () => {
    return (

        <div>
            <h1 className='text-2xl font-bold px-6 py-3 bg-white border-b-2'>Admin Dashboard</h1>
            <div className="space-y-6 px-6 py-3 ">
                <Stats />
            </div>
            <div className="space-y-6 py-3 ">
                <AllLabs />
            </div>
        </div>
    );
};

export default Dashboard;