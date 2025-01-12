import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import AddUser from "@/components/AddingUsers";

const UserManagement = () => {
    const [allUsers, setAllUsers] = useState([]);  // Initialize with empty array
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        phone: "",
        status: "active",
    });

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await axios.get("https://task-1-e1d9.onrender.com/api/admin/getUsers");
                // Check if res.data is the array, if not, access the correct property
                const users = Array.isArray(res.data) ? res.data : res.data.users; // Adjust based on your API response
                setAllUsers(users || []);  // Fallback to empty array if undefined
            } catch (error) {
                console.error("Error fetching users:", error);
                setAllUsers([]);  // Set empty array on error
            }
        };
        getAllUsers();
    }, []);

    // Add a check for empty allUsers or loading state
    if (!allUsers.length) {
        return (
            <div>
                <div className="text-2xl font-bold px-6 py-3 border-b-2">User Management</div>
                <div className="py-4 px-5">No users found</div>
            </div>
        );
    }

    return (
        <div>
            <div className="text-2xl font-bold px-6 py-3 border-b-2">User Management</div>
            <div className="py-4 px-5 flex flex-col gap-5">
                <div className="border-2 p-4 rounded-lg flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-semibold">All Users</div>
                        <div>
                            <AddUser setNewUser={setNewUser} newUser={newUser} />
                            <Button variant="secondary" className="ml-2">
                                Import CSV
                            </Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allUsers.map((user) => (
                                <TableRow key={user._id}>  {/* Changed from user.id to user._id */}
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;