import React from 'react'
import { BookOpenText, LayoutDashboard, MonitorUp, User2, File } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUser } from '@/context/userContext'

const CandidateSideBarItems = [
    {
        name: 'Home',
        icon: <LayoutDashboard size={16} />,
        link: '/home'
    },
    {
        name: 'All Pathways',
        icon: <MonitorUp size={16} />,
        link: '/home'
    },
    {
        name: 'Learning Resources',
        icon: <BookOpenText size={16} />,
        link: '/home'
    },
    {
        name: 'Documents',
        icon: <File size={16} />,
        link: '/home'
    },
    {
        name: 'Profile',
        icon: <User2 size={16} />,
        link: '/home'
    }
]

const Sidebar = () => {
    const { role, loading, user } = useUser()

    return (
        <div className='w-64 border-r-2 min-h-screen'>
            <div className='border-b-2'>
                <img src='/logo.png' alt='logo' className='py-[10px] pl-[12px] pr-[48px]' />
            </div>

            <div className='px-2 py-3'>
                {
                    CandidateSideBarItems.map((item, index) => (
                        <Link to={item.link} key={index} className='flex items-center p-[10px] hover:bg-gray-100 rounded-lg cursor-pointer'>
                            {item.icon}
                            <span className='ml-[10px]'>{item.name}</span>
                        </Link>
                    ))
                }
            </div>


        </div>
    )
}

export default Sidebar