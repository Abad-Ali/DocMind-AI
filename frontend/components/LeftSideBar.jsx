'use client'
import { BookMarkedIcon, Home, SearchIcon, SettingsIcon, SunIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const LeftSideBar = () => {
    const {user} = useSelector(store=>store.auth);

    const sidebarItems = [
      { icon:<Home/>, text:"Home"},
      { icon:<SearchIcon/>, text:"Search"},
      { icon:<BookMarkedIcon/>, text:"Saved PDFs"},
      { icon:<SettingsIcon/>, text:"Settings"},
      { icon:(
      <Avatar className="w-7.7 h-7.7">
        <AvatarImage src={user?.profilePicture || 'https://github.com/Abad-Ali.png'} alt="Profile_pic"/>
        <AvatarFallback>DI</AvatarFallback>
      </Avatar>
      ), text:"Profile" , username: user.username},
    ]
  return (
    <nav className='fixed top-0.5 bottom-0.5 z-20 bg-white/10 backdrop-blur-lg border-r-2 border-slate-500 flex justify-center rounded-r-lg w-xs'>
        <div>
            <div className='mt-7 text-center'>
                <div className='flex justify-center items-center'><Image src='/logo2.png' alt='logo' height={100} width={100}/></div>
                <span className='text-2xl text-blue-600 font-bold font-serif'>DocMind AI</span>
                <p className='text-xs text-slate-500 italic font-serif'>PDFs with AI Intelligence</p>
            </div>
            <div className='bg-slate-500 h-[2px] w-[17vw] mt-3 mb-5'/>

            
            {
                sidebarItems.map((item, index) => {
                   return (
                    <div key={index}>
                        {
                            item.text !== 'Profile' ?(
                                <div className='flex items-center gap-2 hover:bg-white/5 duration-300 px-3 py-1.5 rounded-sm text-white cursor-pointer mx-3 my-1'>
                                    <span className='w-7 h-7 cursor-pointer'>{item.icon}</span>
                                    <span className='font-semibold cursor-pointer text-[17px]'>{item.text}</span>
                                </div>
                            ):(
                                <div className='absolute bottom-5 text-center'>
                                    <span className='text-xl font-bold font-serif text-white'>Your Profile</span>
                                    <div className='bg-slate-500 h-[2px] w-[17vw] my-2'/>
                                    <div className='flex items-center gap-3 hover:bg-white/5 duration-300 w-[15vw] px-3 py-2 rounded-sm text-white cursor-pointer mx-3 my-1'>
                                        <span className='w-7 h-7 cursor-pointer'>{item.icon}</span>
                                        <span className='font-semibold cursor-pointer text-[17px]'>{item.username}</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )})  
            }
        </div>
    </nav>
  )
}

export default LeftSideBar
