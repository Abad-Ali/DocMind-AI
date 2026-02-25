'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { ShieldCheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from "sonner";

const VerifyEmailPage = () => {
const [loading, setloading] = useState(false);
const searchParams = useSearchParams();
const email = searchParams.get("email") || "";
const [input, setInput] = useState({
    email:email,
    code:""
});

const handleChange = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
};
const router = useRouter();

const verifyEmailHandler = async(e)=>{
    e.preventDefault();
    // console.log(input);
    setloading(true);
    try {
        const res = await axios.post(`http://localhost:8000/api/v1/user/verifyemail`, input,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(res.data.success){
            // router.push('/signup/verify-email');
            router.push('/login');
            toast.success(res.data.message);
            setInput({
                email:"",
                code:""
            })
        }
    } catch (error) {
        // console.log(error)
        toast.error(error.response.data.message);
    }finally{
        setloading(false)
    }
}
  return (
    <div className='flex justify-center items-center bg-black text-white w-screen h-screen overflow-hidden'>
        <div className='text-center border-2 border-slate-500 rounded-lg px-7 py-5 w-sm h-xl mx-2 mb-10 md:mb-0'>
            <div className='flex justify-center items-center my-3'>
                <Image src='/docmindai_logo.png' alt='logo' height={200} width={200}/>
            </div>
            <h1 className='text-2xl font-bold font-serif'>Verify Your Email</h1>
            <span className='font-serif italic text-slate-500 my-1'>Verify your email and enjoy all the services.</span>
            <form onSubmit={verifyEmailHandler} className='my-2 flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                    <Label htmlFor="email" className='text-[18px] font-serif'>Email address :</Label>
                    <Input type="email" name="email" value={input.email} onChange={handleChange} id='email' className='bg-white text-black' required placeholder="docmindai@gmail.com"/>
                </div>
                <div className='flex flex-col gap-1'>
                    <Label htmlFor="code" className='text-[18px] font-serif'>Verification code :</Label>
                    <Input type="code" name="code" value={input.code} onChange={handleChange} id='code' className='bg-white text-black' required placeholder="Enter verification code"/>
                </div>

                {
                    loading ? (
                        <button
                           disabled
                           className="bg-blue-700 p-2 mt-3 rounded-lg font-semibold flex items-center justify-center gap-2 opacity-80"
                         >
                           <Image src="/logo2.png" alt="loader" height={25} width={25} className="animate-spin [animation-duration:.7s]"/>
                           Verifying...
                        </button>
                    ):(
                        <button type="submit" className='bg-blue-700 p-2 mt-3 rounded-lg font-semibold cursor-pointer flex justify-center items-center gap-1 hover:bg-blue-800'>
                            <ShieldCheckIcon/>
                            Verify Email
                        </button>

                    )
                }

                <div className='text-[13px] flex justify-end items-center mr-2'><span className='flex'>Email already verified?<Link href='/login' className='text-blue-500 underline underline-offset-2 font-semibold'>&nbsp;Login</Link></span></div>
            </form>
        </div>
    </div>
  )
}

export default VerifyEmailPage
