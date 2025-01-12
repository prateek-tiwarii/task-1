import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = ({ setNewUser, newUser }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const res = await axios.post("https://task-1-e1d9.onrender.com/api/admin/addUser", {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            phone: newUser.phone,
        });

        if (res.data.success) {
            toast.success("User Added");
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add new User</div>
            </DialogTrigger>
            <DialogContent className="p-5">
                <DialogHeader>
                    <DialogTitle>
                        <div className="text-2xl font-semibold">User Profile</div>
                        <div className="text-sm text-gray-600">
                            Detailed information about the user.
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="personalInfo" className="w-full">
                    <TabsList className="w-full justify-between">
                        <TabsTrigger value="personalInfo">Personal Info</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personalInfo" className="py-2 flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={newUser?.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={newUser?.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={newUser?.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={newUser?.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>
                        <Button onClick={handleSubmit} className="bg-blue-600">
                            Save
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default AddUser;
