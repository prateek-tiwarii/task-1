import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/userContext';


const Login = () => {
    const { login, loading } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            console.log('Login Response:', res);
            if (res.success) {

                navigate('/home');
            }

        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Something went wrong, please try again.');
        }
    };

    return (
        <div className='h-screen w-screen flex flex-col relative'>
            <div className='flex justify-center py-9'>
                <img src="/images.png" className='w-32 h-20' alt="Quick Labs" />
            </div>
            <div className='flex w-full px-20'>
                {/* Left Side - Informational Panel */}
                <div className='py-28 px-24 w-full border-2 rounded-l-[20px] border-r-0 flex flex-col gap-4'>
                    <div className='text-2xl font-semibold'>
                        Login User
                    </div>
                    <div className='flex flex-col gap-5 text-sm text-[#5C5E63]'>
                        <div>
                            Welcome back!signin to access all the labs .
                        </div>
                        {/* <div>
                            <ul className='list-disc pl-5'>
                                <li>.</li>
                                <li>Receive updates in real-time.</li>
                                <li>Manage your interview history with ease.</li>
                            </ul>
                        </div> */}
                        <div>
                            Your journey starts here. Let's begin.
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className='py-28 px-24 w-full border-2 flex flex-col gap-10'>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-3'>
                                <input
                                    className='border-[1px] border-gray-300 rounded-xl px-3 py-2'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder='Email'
                                    type="email"
                                    required
                                />
                                <input
                                    className='border-[1px] border-gray-300 rounded-xl px-3 py-2'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder='Password'
                                    type="password"
                                    required
                                />
                                <Button type="submit" className='bg-blue-600 w-full rounded-xl' disabled={loading}>
                                    {loading ? 'Logging in...' : 'Log In'}
                                </Button>
                            </div>
                        </form>
                        <div className='w-full bg-gray-300 h-[1px] my-6'></div>
                        <div className='flex justify-center'>

                        </div>
                    </div>
                    <div className='text-xs text-[#5C5E63] text-center'>
                        By logging in, you agree QuickLabs's Terms of Use and Privacy Policy. Your information will only be used to improve your experience with us.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;