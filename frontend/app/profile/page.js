'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from 'react-redux';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookMarkedIcon, BookmarkXIcon, Edit, LayoutDashboard, Settings } from 'lucide-react';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import Link from 'next/link';

const profilePage = () => {
  const {userProfile,bookmarks, user} = useSelector(store=>store.auth);
  useGetUserProfile();
  return (
    <div className='pl-64 pt-[10vh] text-white'>
      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-2 gap-5 mt-7'>
            <div className='text-center'>
                <div className='flex justify-center items-center'>
                    <Avatar className="h-[150px] w-[150px]">
                      <AvatarImage src={userProfile?.profilePicture || 'logo1.png'} alt="Profile_pic"/>
                      <AvatarFallback>DI</AvatarFallback>
                    </Avatar>
                </div>
                {
                  console.log(userProfile)
                }

                <div className='text-2xl text-blue-700 font-bold font-serif mt-1'><span className='text-xl text-slate-400'>Welcome back </span>{userProfile?.name}</div>
            </div>

            <div className='flex flex-col justify-center'>
                <div className='text-4xl font-serif font-bold flex items-center gap-2'>
                    @{user.username}

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

        <div className='flex gap-5 mt-5'>
            <Button className='!px-12 !py-5 font-bold cursor-pointer'><Edit strokeWidth={3}/>Edit Profile</Button>
            <Button className='!px-12 !py-5 font-bold cursor-pointer'><LayoutDashboard strokeWidth={3}/>Dashboard</Button>
            <Button className='!px-12 !py-5 font-bold cursor-pointer'><Settings strokeWidth={3}/>Settings</Button>
        </div>

        <div className='w-2xl text-center'>
            <div className='flex justify-center items-center gap-2 mt-14 mb-3'>
                <span><BookMarkedIcon/></span>
                <span className='font-semibold'>Bookmarked PDFS</span>
            </div>
            <hr className='border-t-2 border-slate-500'/>
            {
              bookmarks ? (
                <div className='my-7 flex justify-center items-center'>
                    <div className="grid grid-cols-3 gap-5">
                      {bookmarks.map(pdf => (
                          <div key={pdf.id}>
                              <Link href={`/pdf/${pdf.id}`}><div className="relative w-full h-full rounded-2xl overflow-hidden">
                                  <img
                                    src={pdf.previewUrl}
                                    width="250px"
                                    height="150px"
                                    className="rounded-2xl"
                                  />
                                  <div className="absolute bottom-0 bg-black/20 backdrop-blur-lg min-w-full min-h-[30vh] rounded-2xl text-black">
                                      <div className="m-3 mt-5">
                                          <div className='text-start'>
                                              <span className="font-serif font-semibold">Title: </span>
                                              <span className="font-sans font-semibold">{pdf.title}</span>
                                          </div>
              
                                          <div className='text-start'>
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
