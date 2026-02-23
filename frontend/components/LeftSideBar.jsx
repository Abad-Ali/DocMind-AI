'use client'
import { Globe, Home, LayoutDashboard, SearchIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const LeftSideBar = () => {
    const router = useRouter();
    const {user} = useSelector(store=>store.auth);

    const sidebarItems = [
      { icon:<Home/>, text:"Home", path: '/'},
    { icon:<Globe/>, text:"Explore", path: '/explore'},
    ...(user.role === 'admin' ? [{ icon: <LayoutDashboard />, text: "Dashboard", path: '/dashboard' }] : []),
    { icon:<SearchIcon/>, text:"Search", path: '/search'},
    { icon:(
    <Avatar className="w-7.7 h-7.7">
      <AvatarImage src={user.profilePicture} alt="Profile_pic"/>
      <AvatarFallback>DI</AvatarFallback>
    </Avatar>
    ), text:"Profile", path: '/profile'},
  ]

  const leftSideBarHandler = (path) => {
    router.push(path)
  }
  return (
    <nav className='fixed top-0.5 bottom-0.5 z-20 bg-black/90 backdrop-blur-lg border-r-2 border-slate-500 hidden lg:flex justify-center w-[17rem]'>
        <div>
            <div className='mt-7 text-center'>
                <div className='flex justify-center items-center'><Image src='/logo2.png' alt='logo' height={90} width={90}/></div>
                <span className='text-2xl text-blue-600 font-bold font-serif'>DocMind AI</span>
                <p className='text-xs text-slate-500 italic font-serif'>PDFs with AI Intelligence</p>
            </div>
            <div className='bg-slate-500 h-[2px] w-[17vw] mt-3 mb-7'/>

            
            {
                sidebarItems.map((item, index) => {
                   return (
                    <div onClick={()=>leftSideBarHandler(item.path)} key={index}>
                        <div className='flex items-center gap-2 hover:bg-white/5 duration-300 px-3 py-1.5 rounded-sm text-white cursor-pointer mx-3 my-1'>
                            <span className='w-7 h-7 cursor-pointer'>{item.icon}</span>
                            <span className='font-semibold cursor-pointer text-[17px]'>
                              {
                                item.text==="Profile" ? (<div className='text-blue-700 ml-1 font-black'>@{user.username}</div>):(<div>{item.text}</div>)
                              }
                            </span>
                        </div>
                    </div>
                )})  
            }
        </div>
    </nav>
  )
}

export default LeftSideBar
