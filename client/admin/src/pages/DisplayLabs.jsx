import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
    TableFooter
} from "@/components/ui/table";
import { MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

const AllLabs = () => {
    const [isActionDropdownOpen, setIsActionDropdownOpen] = useState({});
    const [allLabs, setAllLabs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const res = await axios.get('https://task-1-cwnabbiy5-tomioka-senseis-projects.vercel.app/api/admin/getLabs');
                setAllLabs(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch labs:", error);
                setIsLoading(false);
            }
        };
        fetchLabs();
    }, []);

    const toggleActionDropdown = (index) => {
        setIsActionDropdownOpen((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (isLoading) {
        return <div className="text-center mt-10 text-gray-600">Loading labs...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Labs</h1>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                {/* <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search labs..."
                        className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}
                <Table className="min-w-full bg-white">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead>Lab Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allLabs.map((lab, index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-gray-50 transition duration-200"
                            >
                                {/* Lab Title */}
                                <TableCell>
                                    <p className="text-sm font-medium text-gray-800">{lab.title}</p>
                                </TableCell>

                                {/* Description */}
                                <TableCell className="text-sm text-gray-600">
                                    {lab.description || 'No description available'}
                                </TableCell>

                                {/* Duration */}
                                <TableCell className="text-sm text-gray-600">
                                    {lab.duration || 'Not specified'}
                                </TableCell>

                                {/* Instructor */}
                                <TableCell className="text-sm text-gray-600">
                                    {lab.instructor || 'Not assigned'}
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="relative">
                                    <div className="flex items-center">
                                        <button
                                            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => toggleActionDropdown(index)}
                                        >
                                            <MoreHorizontal size={18} />
                                        </button>
                                        {isActionDropdownOpen[index] && (
                                            <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                                                <button className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full">
                                                    <CheckCircle size={16} className="mr-2 text-green-500" />
                                                    View Lab Details
                                                </button>
                                                <button className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full">
                                                    <MoreHorizontal size={16} className="mr-2 text-blue-500" />
                                                    Edit Lab
                                                </button>
                                                <button className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full">
                                                    <XCircle size={16} className="mr-2 text-red-500" />
                                                    Delete Lab
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="bg-gray-100">
                            <TableCell colSpan={5} className="text-sm font-medium text-gray-800">
                                Total Labs
                            </TableCell>
                            <TableCell className="text-right text-sm font-semibold text-gray-800">
                                {allLabs.length}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default AllLabs;
