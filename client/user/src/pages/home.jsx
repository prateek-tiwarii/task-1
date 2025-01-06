import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { useUser } from '@/context/userContext';




const Home = () => {
    const [labs, setLabs] = useState([]);
    const { user, loading } = useUser();

    useEffect(() => {
        const fetchEnrolledLabs = async () => {
            if (!user?._id) return;


            try {
                const response = await axios.post('http://localhost:8080/api/user/getLab', {
                    id: user._id,
                });

                if (response.data.success) {
                    console.log("Labs fetched:", response.data.labs); // Log the labs data
                    setLabs(response.data.labs);  // Set labs in the state
                } else {
                    console.error("Failed to fetch labs:", response.data.msg);
                }
            } catch (error) {
                console.error("Error fetching labs:", error.message);
            }
        };

        fetchEnrolledLabs();
    }, [user]);  // Dependency on the `user` object

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-[calc(100vh-100px)] flex-col">
            <div className="px-5 py-4 font-semibold text-xl border-b-2">
                Welcome, {user?.name || 'Guest'}
            </div>

            <div className="px-5 py-4 border-b-2 grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg shadow-sm bg-gray-100">
                    <div className="text-sm font-medium text-gray-600">Total Labs</div>
                    <div className="text-2xl font-bold">{labs.length}</div>
                </div>
                <div className="p-4 border rounded-lg shadow-sm bg-gray-100">
                    <div className="text-sm font-medium text-gray-600">Upcoming Labs</div>
                    <div className="text-2xl font-bold">{labs.filter(lab => lab.status === 'upcoming').length}</div>
                </div>
                <div className="p-4 border rounded-lg shadow-sm bg-gray-100">
                    <div className="text-sm font-medium text-gray-600">Completed Labs</div>
                    <div className="text-2xl font-bold">{labs.filter(lab => lab.status === 'completed').length}</div>
                </div>
            </div>

            <div className="py-4 px-5">
                <div className="text-xl font-semibold mb-4">Your Enrolled Labs</div>
                <div className="border-2 py-4 px-5 rounded-lg">
                    {labs.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Instructor</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {labs.map((lab) => (
                                    <TableRow key={lab._id}>
                                        <TableCell className="font-medium">{lab.title}</TableCell>
                                        <TableCell>{lab.description}</TableCell>
                                        <TableCell>{lab.duration}</TableCell>
                                        <TableCell>{lab.instructor}</TableCell>
                                        <TableCell>
                                            <a
                                                href={`/labs/${lab._id}`}
                                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                            >
                                                View Details
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center text-gray-500">No enrolled labs found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Home;


