import React from 'react'
import { ChevronRight } from 'lucide-react';


const Stats = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="border rounded-lg shadow p-4 bg-white">
                <div className="mb-4">
                    <h2 className="text-lg font-bold">Running Labs</h2>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-4xl font-semibold">120</span>
                    <span className="text-gray-500 text-sm">+10% from last month</span>
                </div>
            </div>

            {/* Card 2 */}
            <div className="border rounded-lg shadow p-4 bg-white">
                <div className="mb-4">
                    <h2 className="text-lg font-bold">Instructor Availability</h2>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-4xl font-semibold">70%</span>
                    <span className="text-gray-500 text-sm">Instructor available</span>
                </div>
            </div>

            {/* Card 3 */}
            <div className="border rounded-lg shadow p-4 bg-white">
                <div className="mb-4">
                    <h2 className="text-lg font-bold">Lab Glitches</h2>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-4xl font-semibold">21</span>
                    <span className="text-gray-500 text-sm">+10% from last month</span>
                </div>
            </div>
        </div>
    );
}

export default Stats