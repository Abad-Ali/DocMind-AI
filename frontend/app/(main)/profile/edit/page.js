'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AtSign, Camera, Loader2, Save, Sparkle, User } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setAuthUser, setUserProfile } from '../../redux/authSlice';
import { motion } from 'framer-motion';

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

    const router = useRouter();
    const dispatch = useDispatch();

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

    const editProfileHandler = async(e)=>{
      e.preventDefault();
      console.log(input);
      setLoading(true);

      const formData = new FormData();
      formData.append('username',input?.username);
      formData.append('name',input?.name);
      formData.append('gender',input?.gender);
      if(input.profilePicture){
        formData.append("profilePicture", input?.profilePicture);
      }
      try {
        const res = await axios.put(`http://localhost:8000/api/v1/user/profile/edit`, formData,{
          // headers:{
          //   'Content-Type':'multipart/form-data'
          // },
          withCredentials:true
        });

        if(res.data.success){
          const updatedUserData = {
            ...userProfile,
            username:res.data.user?.username,
            name:res.data.user?.name,
            profilePicture:res.data.user?.profilePicture,
            gender:res.data.user?.gender
          };
          dispatch(setUserProfile(updatedUserData));
          dispatch(setAuthUser(updatedUserData));
          router.replace('/profile');
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
      }finally{
        setLoading(false);
      }
    }
  return (
    <div className='lg:pl-64 h-screen flex justify-center items-center my-10 lg:my-0'>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-[85vw] sm:w-[70vw] lg:w-3xl flex flex-col sm:flex-row border-2 border-slate-200/10 rounded-2xl'>
          <motion.div initial={{ opacity: 0, y: 30 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className='w-full sm:w-1/2 md:w-1/3 bg-slate-950 backdrop-brightness-200 text-white pt-8 sm:pt-0 p-5 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden rounded-t-2xl sm:rounded-l-2xl'>
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
          </motion.div>

          <div className='bg-slate-100 sm:bg-[#F8FAFC] backdrop-brightness-200 w-full lg:w-2/3 rounded-b-2xl sm:rounded-r-2xl'>
            <motion.div initial={{ opacity: 0, x: 50 }} viewport={{ once: true }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className='px-5'>
              <div className='pt-3 sm:pt-8'>
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
                            <SelectItem value="prefer not to say" className="hover:bg-gray-950 focus:bg-gray-900 text-white focus:text-white cursor-pointer">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>

                    {
                      loading ? (
                        <Button disabled={loading} className='h-12 mt-2 cursor-pointer'><Loader2 strokeWidth={3} className='animate-spin'/>Please wait...</Button>
                      ):(
                        <Button type='submit' className='h-12 mt-2 cursor-pointer'><Save strokeWidth={3} size={18}/>Save Changes</Button>
                      )
                    }
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default editProfilepage