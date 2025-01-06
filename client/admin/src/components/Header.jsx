import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4 h-[70px]">
            <div className="flex-grow max-w-xl mx-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="search by topic, title, or Instructor"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative">
                    <Bell className="text-gray-600 hover:text-gray-800" size={24} />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                    </span>
                </div>

                <div className="relative">
                    <div
                        className="flex items-center space-x-2 rounded-md py-1 px-4 border border-gray-200 cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                            <User className="text-gray-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">keshav Malik</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                        <ChevronDown className="text-gray-600" size={20} />
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-55 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                            <div className="p-4 border-b border-gray-200">
                                <p className="text-sm font-medium">Adminql@gmail.com</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                            <ul className="py-2">
                                <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Profile Settings</li>
                                <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;