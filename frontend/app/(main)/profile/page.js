'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookMarkedIcon, BookmarkXIcon, Edit, InfoIcon, KeySquare, LayoutDashboard, Loader2, LogOutIcon, LucideCrown, Settings, SettingsIcon, ShieldCheck } from 'lucide-react';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from 'axios';
import { toast } from 'sonner';
import { setAuthUser, setBookmarks, setUserProfile } from '../redux/authSlice';
import { setRecentPDF } from '../redux/recentPDFSlice';
import { setPDF } from '../redux/pdfSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const profilePage = () => {
  const [activeButton, setActiveButton] = useState("");
  const [loading, setloading] = useState(false);
  const [input, setInput] = useState({
    currentPassword:"",
    newPassword:"",
    confirmPassword:""
  });
  const [adminInput, setAdminInput] = useState({
    password:"",
    adminKey:""
  });
  const {userProfile,bookmarks, user} = useSelector(store=>store.auth);
  useGetUserProfile();

  const dispatch = useDispatch();

  const router = useRouter();

  const handleChange = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  };

  const changePasswordHandler = async(e)=>{
    e.preventDefault();
    console.log(input);
    setloading(true);
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/changepassword`, input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });

      if(res.data.success){
        toast.success(res.data.message);
        setInput({
          currentPassword:"",
          newPassword:"",
          confirmPassword:""
        })
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setloading(false);
    }
  }

  const adminChangeHandler = (e)=>{
    setAdminInput({...adminInput, [e.target.name]:e.target.value});
  }

  const becomeAdminHandler = async(e)=>{
    e.preventDefault();
    console.log(adminInput);
    setloading(true);
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/become-admin`, adminInput,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });

      if(res.data.success){
        toast.success(res.data.message);
        setAdminInput({
          password:"",
          adminKey:""
        })
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setloading(false);
    }
  }

  const logoutHandler = async()=>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {withCredentials:true});

      if(res.data.success){
        dispatch(setAuthUser(null));
        dispatch(setUserProfile(null));
        dispatch(setBookmarks([]));
        dispatch(setPDF(null));
        dispatch(setRecentPDF([]));
        localStorage.removeItem("token");
        router.replace('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.messageb || "Logout failed")
    }
  }

  if (!user || !userProfile) {
    return <div className="pl-64 pt-[10vh] text-white">Loading profile...</div>;
  }
  return (
    <div className='lg:pl-64 pt-[10vh] text-white min-h-screen'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 mt-7'>
            <div className='text-center'>
                <div className='flex justify-center items-center'>
                    <Avatar className="h-[150px] w-[150px]">
                      <AvatarImage src={userProfile?.profilePicture || '/logo1.png'} alt="Profile_pic"/>
                      <AvatarFallback>DI</AvatarFallback>
                    </Avatar>
                </div>
                {/* {
                  console.log(userProfile)
                } */}

                <div className='hidden sm:inline text-2xl text-blue-700 font-bold font-serif mt-1'><span className='text-xl text-slate-400'>Welcome back</span>&nbsp;{userProfile?.name || "User"}</div>
            </div>

            <div className='flex flex-col justify-center items-center sm:items-start'>
                <div className='text-4xl font-serif font-bold flex items-center gap-2'>
                    @{userProfile.username}

                    <Badge className='font-bold'>{userProfile.role}</Badge>
                </div>

                {/* <div className='text-2xl font-bold font-serif'>{user.name}</div> */}
                <div className='text-xl text-slate-400 font-bold font-serif'>{userProfile.email}</div>

                <span className="text-xs md:text-sm text-slate-400 font-semibold">
                  Joined on {new Date(userProfile?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
            </div>
        </div>

        <div className='flex flex-wrap justify-center gap-3 mt-5'>
            <Button onClick={()=>router.push('/profile/edit')} className='!px-10 lg:!px-12 !py-5 font-bold cursor-pointer'><Edit strokeWidth={3}/>Edit Profile</Button>
            {
              userProfile.role === 'admin' ? (
                <Button onClick={()=>router.push('/dashboard')} className='!px-10 lg:!px-12 !py-5 mx-2 font-bold cursor-pointer'><LayoutDashboard strokeWidth={3}/>Dashboard</Button>
              ):(
                <div></div>
              )
            }

            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={()=>setActiveButton('settings')} className='!px-10 lg:!px-12 !py-5 font-bold cursor-pointer'><Settings strokeWidth={3}/>Settings</Button>
              </DialogTrigger>
              {
                activeButton === 'settings' && (
                  <DialogContent className="sm:max-w-sm max-h-[70vh] overflow-y-auto bg-black/10 backdrop-blur-lg backdrop-brightness-200 text-white">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-1.5 font-bold font-serif"><SettingsIcon className='animate-spin [animation-duration:.9.9s]' strokeWidth={3} size={20}/> Settings</DialogTitle>
                    </DialogHeader>
                    <div className='w-full text-center'>
                      <div className='flex flex-col items-center justify-center gap-1'>
                        <img className='rounded-full' src={userProfile.profilePicture} width={100} height={100} alt='profile_pic'/>
                        <div>
                          <h2 className='text-2xl text-blue-700 font-bold font-serif'>@{userProfile.username}</h2>
                          <span className='text-slate-400'>{userProfile.email}</span>
                        </div>
                      </div>
                      <div className='flex flex-col gap-1 mt-3'>
                        <Button onClick={()=>setActiveButton('changePassword')} className='!px-12 !py-5 font-bold cursor-pointer w-full'><KeySquare strokeWidth={3}/>Change Password</Button>
                        <Button onClick={()=>setActiveButton('becomeAdmin')} className='!px-12 !py-5 font-bold cursor-pointer w-full'><LucideCrown strokeWidth={3}/>Become Admin</Button>
                        <Button onClick={()=>router.push('/profile/edit')} className='!px-12 !py-5 font-bold cursor-pointer w-full'><Edit strokeWidth={3}/>Edit Profile</Button>
                        <Button onClick={logoutHandler} className='!px-12 !py-5 font-bold cursor-pointer w-full hover:text-red-500'><LogOutIcon strokeWidth={3}/>Log Out</Button>
                      </div>
                      <p className='text-slate-950 flex gap-1 items-center justify-center mt-2'><InfoIcon size={15}/>Admin key required to become Admin</p>
                    </div>
                  </DialogContent>
                )
              }

              {
                activeButton === 'changePassword' && (
                  <DialogContent className="sm:max-w-sm max-h-[75vh] overflow-y-auto bg-black/10 backdrop-blur-lg backdrop-brightness-200 text-white">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-1.5 font-bold font-serif"><KeySquare size={17} strokeWidth={3}/>Change Password</DialogTitle>
                    </DialogHeader>
                    <div className='w-full text-center'>
                      <div className='flex flex-col items-center justify-center gap-1'>
                        <img className='rounded-full' src={userProfile.profilePicture} width={100} height={100} alt='profile_pic'/>
                        <div>
                          <h2 className='text-2xl text-blue-700 font-bold font-serif'>@{userProfile.username}</h2>
                          <span className='text-slate-400'>{userProfile.email}</span>
                        </div>
                      </div>

                      <form onSubmit={changePasswordHandler} className='flex flex-col gap-2 mt-2'>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="currentPassword" className='text-sm font-serif'>Current Password :</Label>
                            <Input type="password" name="currentPassword" value={input.currentPassword} onChange={handleChange} id='currentPassword' className='bg-white text-black' required placeholder="Enter your current password"/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="newPassword" className='text-sm font-serif'>New Password :</Label>
                            <Input type="password" name="newPassword" value={input.newPassword} onChange={handleChange} id='newPassword' className='bg-white text-black' required placeholder="Enter your new password"/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="confirmPassword" className='text-sm font-serif'>Confirm Password :</Label>
                            <Input type="password" name="confirmPassword" value={input.confirmPassword} onChange={handleChange} id='confirmPassword' className='bg-white text-black' required placeholder="Confirm your new password"/>
                        </div>

                        {
                          loading ? (
                            <Button disabled={loading} type='submit' className='mt-1 cursor-pointer'><Loader2 strokeWidth={3} className='animate-spin'/> Please wait...</Button>
                          ):(
                            <Button type='submit' className='mt-1 cursor-pointer'>Change Password</Button>
                          )
                        }
                      </form>
                    </div>
                  </DialogContent>
                )
              }

              {
                activeButton === "becomeAdmin" && (
                  <DialogContent className="sm:max-w-sm max-h-[75vh] overflow-y-auto bg-black/10 backdrop-blur-lg backdrop-brightness-200 text-white">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-1.5 font-bold font-serif"><LucideCrown size={17} strokeWidth={3}/>Become Admin</DialogTitle>
                    </DialogHeader>
                    <div className='w-full text-center'>
                      <div className='flex flex-col items-center justify-center gap-1'>
                        <img className='rounded-full' src={userProfile.profilePicture} width={100} height={100} alt='profile_pic'/>
                        <div>
                          <h2 className='text-2xl text-blue-700 font-bold font-serif'>@{userProfile.username}</h2>
                          <span className='text-slate-400'>{userProfile.email}</span>
                        </div>
                      </div>

                      <form onSubmit={becomeAdminHandler} className='flex flex-col gap-2 mt-2'>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="password" className='text-sm font-serif'>Password :</Label>
                            <Input type="password" name="password" value={adminInput.password} onChange={adminChangeHandler} id='password' className='bg-white text-black' required placeholder="Enter your password"/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="adminKey" className='text-sm font-serif'>Admin Key :</Label>
                            <Input type="password" name="adminKey" value={adminInput.adminKey} onChange={adminChangeHandler} id='adminKey' className='bg-white text-black' required placeholder="Enter the admin key"/>
                        </div>

                        {
                          loading ? (
                            <Button disabled={loading} type='submit' className='mt-1 cursor-pointer'><Loader2 strokeWidth={3} className='animate-spin'/>Verifying...</Button>
                          ):(
                            <Button type='submit' className='mt-1 cursor-pointer'><ShieldCheck strokeWidth={3}/>Verify Admin Key</Button>
                          )
                        }
                      </form>
                    </div>
                  </DialogContent>
                )
              }
            </Dialog>
        </div>

        <div className='w-[87vw] lg:w-2xl text-center'>
            <div className='flex justify-center items-center gap-2 mt-14 mb-3'>
                <span><BookMarkedIcon/></span>
                <span className='font-semibold'>Bookmarked PDFS</span>
            </div>
            <hr className='border-t-2 border-slate-500'/>
            {
              bookmarks.length > 0 ? (
                <div className='my-7 flex justify-center items-center'>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                      {bookmarks.map(pdf => (
                          <div key={pdf.id}>
                              <Link href={`/pdf/${pdf.id}`}><div className="relative [@media(min-width:0px)_and_(max-width:549px)]:w-[165] w-[225] h-[300] rounded-2xl overflow-hidden">
                                  <img
                                    src={pdf.previewUrl}
                                    className="rounded-2xl w-full h-full"
                                  />
                                  <div className="absolute bottom-0 bg-black/20 backdrop-blur-lg min-w-full min-h-[200] rounded-2xl text-black">
                                      <div className="m-3 mt-5">
                                          <div className='text-start'>
                                              <span className="font-serif font-semibold">Title: </span>
                                              <span className="font-sans font-semibold">{pdf.title}</span>
                                          </div>
              
                                          <div className='text-start overflow-y-auto max-h-[75] scroll-hide scrollable'>
                                              <span className="font-serif font-semibold">Description: </span>
                                              <span className="font-sans font-semibold">{pdf.description}</span>
                                          </div>
              
                                          <div className='text-start'>
                                              <span className="font-serif font-semibold">Author: </span>
                                              <span className="font-sans font-semibold">{pdf.author}</span>
                                          </div>
              
                                          <div className='text-start'>
                                              <span className="font-serif font-semibold">Upload by: </span>
                                              <span className="font-sans font-semibold text-blue-700">{pdf.uploadedBy.username}</span>
                                          </div>
                                      </div>
                                  </div>
                              </div></Link>
                          </div>
                      ))}
                    </div>
                </div>
              ):(
                <div className='flex flex-col items-center my-10 gap-2'>
                  <div className='p-3 rounded-full border-4 border-slate-500 w-fit h-fit'><BookmarkXIcon className='text-slate-500' size={30} strokeWidth={3}/></div>
                  <div>
                    <span className='text-slate-500 font-bold text-lg'>No Bookmarks To Show</span>
                    <p className='text-slate-500 font-semibold'>When you add bookmarks, they will appear on your profile.</p>
                  </div>
                </div>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default profilePage