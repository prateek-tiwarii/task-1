import { Calendar } from 'lucide-react'
import React from 'react'

const StatCard = () => {
    return (
        <div className='p-3 shadow-lg border-[1px] rounded-lg flex flex-col gap-1'>
            <div className='flex justify-between'>
                <div className='text-lg font-medium'>
                    pending labs
                </div>
                <div className='bg-blue-200 p-2 rounded-xl'>
                    <Calendar size={16} />
                </div>
            </div>
            <div className='flex text-4xl px-2'>
                1
            </div>
            <div className='text-sm text-gray-500'>
                Next : Data prep lab with vertex ai <br /> 24hr left
            </div>
        </div>
    )
}

export default StatCard