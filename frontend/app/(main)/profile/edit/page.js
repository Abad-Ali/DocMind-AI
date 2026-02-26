'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AtSign, Camera, Save, Sparkle, User } from 'lucide-react';

const editProfilepage = () => {
    const {userProfile} = useSelector(store=>store.auth);
    const imageRef = useRef();
    const [loading, setLoading] = useState(false);
    const [input,setInput] = useState({
      profilePicture: userProfile?.profilePicture,
      username: userProfile?.username,
      name: userProfile?.name,
      gender: userProfile?.gender || 'prefer not to say'
    })

    const fileChangeHandler = (e)=>{
      const file = e.target.files?.[0];
      if(file){
        setInput({...input, profilePicture:file});
        // console.log(input);
      }
    }

    const handleChange = (e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    }; 

    const editProfileHandler = (e)=>{
      e.preventDefault();
      console.log(input);
    }
  return (
    <div className='pl-64 h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-3xl flex'>
          <div className='w-full md:w-1/3 bg-slate-950 text-white p-8 flex flex-col items-center justify-center relative overflow-hidden rounded-l-2xl'>
            <div className="relative z-10 flex flex-col items-center gap-4 cursor-pointer">
              <div className="relative group">
                <img className="rounded-full w-32 h-32 object-cover border-4 border-white/20 shadow-lg transition-all duration-300 group-hover:border-white/40" src={userProfile?.profilePicture} alt="Profile"/>
                <input ref={imageRef} onChange={fileChangeHandler} type="file" className="hidden" accept="image/*" />
                <button onClick={()=>imageRef.current.click()} className="absolute bottom-1 right-1 bg-white text-slate-900 p-2 rounded-full shadow-md hover:bg-slate-100 transition-colors" aria-label="Change profile photo">
                  <Camera size={18} className='cursor-pointer'/>
                </button>
              </div>

              <div className="text-center mt-2">
                <h2 className="text-xl font-bold tracking-wide flex items-center justify-center gap-1"><AtSign size={17} strokeWidth={3}/>{userProfile?.username}</h2>
                <p className="text-slate-400 text-sm flex items-center justify-center gap-1 mt-1">{userProfile?.email}</p>
              </div>
            </div>
          </div>

          <div className='bg-[#F8FAFC] w-2/3 rounded-r-2xl'>
            <div className='px-5'>
              <div className='pt-8'>
                <h1 className="text-3xl font-bold text-slate-800">Edit Profile</h1>
                <p className="text-slate-500 font-semibold">Keep your profile information up to date.</p>
                <hr className='border-[0.5] border-slate-400 my-2'/>
              </div>

              <div className='mb-5 text-black'>
                <form onSubmit={editProfileHandler} className='flex flex-col gap-2 py-2'>
                    <div className='flex flex-col gap-1'>
                        <Label htmlFor="username" className='text-[15px] text-slate-700 gap-0.5'><AtSign size={15}/>Username :</Label>
                        <Input type="username" name="username" value={input.username} onChange={handleChange} id='username' className='py-5 focus-visible:ring-transparent border-gray-400' required placeholder={`@${userProfile.username}`}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label htmlFor="name" className='text-[15px] text-slate-700 gap-0.5'><User size={15}/>Full Name :</Label>
                        <Input type="name" name="name" value={input.name} onChange={handleChange} id='name' className='py-5 focus-visible:ring-transparent border-gray-400' required placeholder={userProfile.name}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label htmlFor="gender" className='text-[15px] text-slate-700 gap-0.5'><Sparkle size={15}/>Gender :</Label>
                        <Select id='gender' defaultValue={input.gender} onValueChange={(value) => setInput({...input, gender: value})}>
                          <SelectTrigger className="w-full py-5 focus-visible:ring-transparent border-gray-400 cursor-pointer">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent className='bg-gray-950'>
                            <SelectItem value="male" className="hover:bg-gray-950 focus:bg-gray-900 text-white focus:text-white cursor-pointer">Male</SelectItem>
                            <SelectItem value="female" className="hover:bg-gray-950 focus:bg-gray-900 text-white focus:text-white cursor-pointer">Female</SelectItem>
                            <SelectItem value="prefer not to say" className="hover:bg-gray-950 focus:bg-gray-900 text-white focus:text-white cursor-pointer">Prefer not to say</        SelectItem>
                          </SelectContent>
                        </Select>
                    </div>

                    <Button type='submit' className='h-12 mt-2 cursor-pointer'><Save strokeWidth={3} size={18}/>Save Changes</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default editProfilepage