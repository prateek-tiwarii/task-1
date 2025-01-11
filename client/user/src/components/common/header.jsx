import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown, Bell } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChangePassword from './changePass';
import { useUser } from '@/context/userContext';


const Header = () => {
    const { isUser, loading, user, logout, role } = useUser();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

    const handleLogout = () => {
        console.log('logout');
        logout();
        window.loca; tion.replace('/');
    };

    const handleChangePassword = () => {
        setIsPasswordModalOpen(true);
        setOpen(false); // Close the popover
    };

    return (
        <>
            <div className='flex justify-end w-full p-[11px] border-b-2 gap-4'>
                <div className='shadow-md w-fit p-2 rounded-lg cursor-pointer'>
                    <Bell size={16} />
                </div>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[250px] justify-between"
                        >
                            {value
                                ? frameworks.find((framework) => framework.value === value)?.label
                                : <div className='flex items-center gap-2'>
                                    <Avatar className='w-6 h-6'>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    {user?.name}
                                </div>}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                        <Command>
                            <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandItem>
                                        <button onClick={handleChangePassword} className="w-full text-left">
                                            Change Password
                                        </button>
                                    </CommandItem>
                                    <CommandItem>Profile Settings</CommandItem>
                                    <CommandItem>{role?.charAt(0).toUpperCase() + role?.slice(1)}</CommandItem>
                                    <CommandItem>
                                        <button onClick={handleLogout} className="w-full text-left">LogOut</button>
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <ChangePassword
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </>
    );
};

export default Header;