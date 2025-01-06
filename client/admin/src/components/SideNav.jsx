import React from 'react';
import {
    LayoutDashboard,
    CalendarCheck,
    Users,
    UserCheck,
    Settings,
    Clock
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SideNavigation = () => {
    const location = useLocation();

    const navItems = [
        {
            icon: <LayoutDashboard />,
            text: 'Dashboard',
            path: '/dashboard'
        },
        {
            icon: <CalendarCheck />,
            text: 'Create Labs',
            path: '/create-labs'
        },
        {
            icon: <Users />,
            text: 'Add Users',
            path: '/add-users'
        },
        // {
        //     icon: <UserCheck />,
        //     text: 'Interviewer Management',
        //     path: '/interviewer-management'
        // },
        {
            icon: <Clock />,
            text: 'Discarded Labs',
            path: '/past-interviews'
        },
        {
            icon: <Settings />,
            text: 'Settings',
            path: '/settings'
        }
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-gray-200 shadow-sm">
            <div className="h-[70px] flex items-center justify-center border-b border-gray-200">
                <div className="flex items-center">

                    <div className="mr-4"><img src="./images.png" className='size-12' /></div>
                    <h1 className="text-xl font-bold text-gray-800">QuickLabs</h1>
                </div>
            </div>

            <nav className="mt-4">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`
              flex 
              items-center 
              px-4 
              py-3 
              m-2
              text-gray-700
              hover:bg-[#1D4CBE]
              hover:rounded-lg
              hover:text-white
              hover:m-2
              transition
              ${location.pathname === item.path
                                ? 'bg-[#1D4CBE] text-white rounded-lg m-2 font-semibold'
                                : 'bg-white'}
            `}
                    >
                        <span className="mr-3 text-white-600">{item.icon}</span>
                        <span className='text-sm'>{item.text}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default SideNavigation;