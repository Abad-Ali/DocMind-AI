'use client'
import { Globe, Home, LayoutDashboard, SearchIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from "framer-motion";
import Link from 'next/link'

const LeftSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {user} = useSelector(store=>store.auth);
  if (!user) return null
  const sidebarItems = [
    { icon:<Home/>, text:"Home", path: '/'},
    { icon:<Globe/>, text:"Explore", path: '/explore'},
    ...(user.role === 'admin' ? [{ icon: <LayoutDashboard />, text: "Dashboard", path: '/dashboard' }] : []),
    { icon:<SearchIcon/>, text:"Search", path: '/search'},
    { icon:(
    <Avatar className="w-7.7 h-7.7 border-2 border-white/30">
      <AvatarImage src={user?.profilePicture || '/default_pic.jpg'} alt="Profile_pic"/>
      <AvatarFallback>DI</AvatarFallback>
    </Avatar>
    ), text:"Profile", path: '/profile'},
  ]

  const leftSideBarHandler = (path) => {
    router.push(path)
  }
  return (
    <motion.nav initial={{ opacity: 0, x: -50 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className='fixed top-2 lg:top-0.5 lg:bottom-0.5 z-20 bg-black/20 lg:bg-black/90 backdrop-blur-lg border-x-2 border-slate-500/70 flex lg:justify-center w-[95vw] lg:w-[17rem] px-3 lg:px-0 py-2.5 lg:py-0 rounded-2xl lg:rounded-none backdrop-brightness-200'>
        <div className='flex justify-evenly lg:justify-start w-full lg:flex-col'>
            <Link href='/' className='lg:mt-7 text-center flex justify-center items-center gap-1 lg:flex-col'>
                <div className='flex justify-center items-center'><div className='w-10 h-10 lg:h-25 lg:w-25'><Image src='/logo2.png' alt='logo' height={90} width={90}/></div></div>
                <span className='hidden sm:inline text-[17px] lg:text-2xl text-blue-600 font-bold font-serif whitespace-nowrap'>DocMind AI</span>
                <p className='hidden lg:inline text-xs text-slate-500 italic font-serif'>PDFs with AI Intelligence</p>
            </Link>
            <div className='w-full flex justify-center items-center'><div className='bg-slate-500 h-[2px] w-[17vw] mt-3 mb-7 hidden lg:inline'/></div>

            {
                sidebarItems.map((item, index) => {
                  const isActive = pathname === item.path;
                   return (
                    <div onClick={()=>leftSideBarHandler(item.path)} key={index}>
                        <motion.div initial={{ opacity: 0, x: -30 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: index/7, ease: "easeInOut" }} className={`flex items-center sm:gap-0.5 lg:gap-2 hover:bg-white/5 duration-300 px-1.5 lg:px-3 py-1 lg:py-1.5  text-white cursor-pointer lg:mx-3 my-0.5 ${isActive ? 'bg-gradient-to-r from-blue-800 to via-black to-blue-800 backdrop-brightness-200 duration-300 border border-slate-500 lg:border-none':'border border-black/1 lg:border-none'} duration-300 ${item.text === 'Profile' ? 'rounded-full lg:rounded-lg py-1.5':'rounded-lg'}`}>
                            <span className={`w-7 h-7 cursor-pointer flex justify-center items-center`}>{item.icon}</span>
                            <span className='hidden sm:inline font-semibold cursor-pointer text-[17px]'>
                              {
                                item.text==="Profile" ? (<div className='lg:ml-1 font-bold hidden lg:inline'>@{user.username}</div>):(<div>{item.text}</div>)
                              }
                            </span>
                        </motion.div>
                    </div>
                )})  
            }
        </div>
    </motion.nav>
  )
}

export default LeftSideBar
