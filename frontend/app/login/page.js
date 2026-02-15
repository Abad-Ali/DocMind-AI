"use client";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios';
import { LogIn } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from "sonner";

const LoginPage = () => {
    const [loading, setloading] = useState(false);
    const [input, setInput] = useState({
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    };

    const router = useRouter();

    const signupHandler = async(e)=>{
        e.preventDefault();
        // console.log(input);
        setloading(true);
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/login`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });

            if(res.data.success){
                router.replace('/');
                toast.success(res.data.message);
                setInput({
                    email:"",
                    password:""
                })
            }
        } catch (error) {
            // console.log(error)
            toast.error(error.response.data.message);
        }finally{
            setloading(false);
        }
    }
  return (
    <div className='flex justify-center items-center bg-black text-white w-screen h-screen overflow-hidden'>
        <div className='text-center border-2 border-slate-500 rounded-lg px-7 py-5 w-lg h-xl mx-2 mb-10 md:mb-0'>
            <div className='flex justify-center items-center my-3'>
                <Image src='/docmindai_logo.png' alt='logo' height={200} width={200}/>
            </div>
            <h1 className='text-2xl font-bold font-serif'>Login</h1>
            <span className='font-serif italic text-slate-500 my-1'>Learn With Artificial Intelligence.</span>
            <form onSubmit={signupHandler} className='my-2 flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                    <Label htmlFor="email" className='text-[18px] font-serif'>Email address :</Label>
                    <Input type="email" name="email" value={input.email} onChange={handleChange} id='email' required placeholder="docmindai@gmail.com"/>
                </div>
                <div className='flex flex-col gap-1'>
                    <Label htmlFor="password" className='text-[18px] font-serif'>Password :</Label>
                    <Input type="password" name="password" value={input.password} onChange={handleChange} id='password' required placeholder="Enter your password"/>
                </div>

                {/* <button type="submit" className='bg-blue-700 p-2 my-3 rounded-lg font-semibold cursor-pointer'>Signup</button> */}
                {
                    loading ? (
                        <button
                           disabled
                           className="bg-blue-700 p-2 mt-3 rounded-lg font-semibold flex items-center justify-center gap-2 opacity-80"
                         >
                           <Image src="/logo2.png" alt="loader" height={25} width={25} className="animate-spin [animation-duration:.7s]"/>
                           Please wait...
                        </button>
                    ):(
                        <button type="submit" className='bg-blue-700 p-2 mt-3 rounded-lg font-semibold cursor-pointer flex justify-center items-center gap-2 hover:bg-blue-800'>
                            <LogIn size={20}/>
                            Signup
                        </button>

                    )
                }

                <div className='text-[13px] flex justify-end items-center mr-2'><span className='flex'>Doesn't have an account?<Link href='/signup' className='text-blue-500 underline underline-offset-2 font-semibold'>&nbsp;Signup</Link></span></div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
