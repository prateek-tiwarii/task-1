import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ChevronDown, Clock, AlignLeft, User, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const DURATION_OPTIONS = [
    { value: "30", label: "30 mins" },
    { value: "45", label: "45 mins" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
];

const AddLabs = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [allUsers, setAllUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://task-1-e1d9.onrender.com/api/admin/getUsers");
                // Handle both array and object response formats
                const users = Array.isArray(response.data) ? response.data : response.data.users;
                const formattedUsers = (users || []).map(user => ({
                    id: user._id || user.id,
                    name: user.name,
                    email: user.email
                }));
                setAllUsers(formattedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to load users");
                setAllUsers([]);
            }
        };

        fetchUsers();
    }, []);

    const onSubmit = async (data) => {
        if (selectedUsers.length === 0) {
            toast.error("Please select at least one user");
            return;
        }

        setIsLoading(true);
        try {
            const labData = {
                title: data.title,
                description: data.description,
                duration: data.duration,
                instructor: data.instructor,
                userEmails: selectedUsers.map(user => user.email)  // Send emails instead of IDs
            };

            const response = await axios.post("https://task-1-e1d9.onrender.com/api/admin/addLab", labData);

            if (response.data.success) {
                toast.success("Lab added successfully");
                // Reset form
                reset();
                setSelectedUsers([]);
            } else {
                toast.error(response.data.message || "Failed to add lab");
            }
        } catch (error) {
            console.error("Error adding lab:", error);
            toast.error(error.response?.data?.message || "An error occurred while adding the lab");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserSelection = (user) => {
        setSelectedUsers(prev => {
            const isAlreadySelected = prev.some(u => u.id === user.id);
            if (isAlreadySelected) {
                return prev.filter(u => u.id !== user.id);
            }
            return [...prev, user];
        });
    };

    const renderUserDropdown = () => {
        const safeUsers = Array.isArray(allUsers) ? allUsers : [];

        return (
            <div className="relative">
                <div
                    className="w-full border rounded-md p-2 min-h-[42px] flex flex-wrap gap-2 cursor-pointer"
                    onClick={() => setIsUserDropdownOpen(prev => !prev)}
                >
                    {selectedUsers.map((user) => (
                        <span
                            key={user.id}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                        >
                            {user.name}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUserSelection(user);
                                }}
                                className="ml-2"
                            >
                                <X size={16} className="text-red-500" />
                            </button>
                        </span>
                    ))}
                    {selectedUsers.length === 0 &&
                        <span className="text-gray-500">Select users...</span>
                    }
                    <ChevronDown className="ml-auto text-gray-500" size={20} />
                </div>

                {isUserDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 border rounded-md bg-white shadow-lg max-h-60 overflow-y-auto">
                        {safeUsers
                            .filter(user => !selectedUsers.some(s => s.id === user.id))
                            .map(user => (
                                <div
                                    key={user.id}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        handleUserSelection(user);
                                        setIsUserDropdownOpen(false);
                                    }}
                                >
                                    {user.name} ({user.email})
                                </div>
                            ))}
                        {safeUsers.length === 0 && (
                            <div className="px-3 py-2 text-gray-500">No users available</div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex h-full">
            <div className="w-2/3 overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-xl font-semibold mb-4 px-6 py-3 border-b-2">
                        Lab Details
                    </h2>

                    <div className="grid grid-cols-2 gap-4 px-6 py-3">
                        {/* Lab Title */}
                        <div>
                            <label className="mb-2 flex items-center">
                                <User className="mr-2 text-gray-500" size={18} />
                                Lab Title
                            </label>
                            <input
                                {...register("title", {
                                    required: "Title is required",
                                    minLength: { value: 3, message: "Title must be at least 3 characters" }
                                })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter lab title"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="mb-2 flex items-center">
                                <Clock className="mr-2 text-gray-500" size={18} />
                                Duration
                            </label>
                            <Controller
                                name="duration"
                                control={control}
                                rules={{ required: "Duration is required" }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Duration</option>
                                        {DURATION_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.duration && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.duration.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <label className="mb-2 flex items-center">
                                <AlignLeft className="mr-2 text-gray-500" size={18} />
                                Description
                            </label>
                            <textarea
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: { value: 10, message: "Description must be at least 10 characters" }
                                })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
                                placeholder="Enter lab description"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Instructor */}
                        <div className="col-span-2">
                            <label className="mb-2 flex items-center">
                                <User className="mr-2 text-gray-500" size={18} />
                                Instructor Name
                            </label>
                            <input
                                {...register("instructor", {
                                    required: "Instructor name is required",
                                    minLength: { value: 2, message: "Instructor name must be at least 2 characters" }
                                })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter instructor name"
                            />
                            {errors.instructor && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.instructor.message}
                                </p>
                            )}
                        </div>

                        {/* User Selection */}
                        <div className="col-span-2">
                            <label className="mb-2 flex items-center">
                                <User className="mr-2 text-gray-500" size={18} />
                                Select Users
                            </label>
                            {renderUserDropdown()}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6 px-6 py-3 border-t">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Adding Lab...' : 'Add Lab'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLabs;