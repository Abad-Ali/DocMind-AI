'use client'
import { BookMarkedIcon, Globe, Home, MoonIcon, SearchIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter();

  const NavbarItems = [
    { icon:<Home/>, text:"Home", path: '/'},
    { icon:<Globe/>, text:"Explore", path: '/explore'},
    { icon:<SearchIcon/>, text:"Search", path: '/search'},
    // { icon:<SettingsIcon/>, text:"Settings"},
    { icon:(
    <Avatar className="w-7.7 h-7.7">
      <AvatarImage src={'https://github.com/Abad-Ali.png'} alt="Profile_pic"/>
      <AvatarFallback>DI</AvatarFallback>
    </Avatar>
    ), text:" Profile", path: '/profile'},
  ]

  const navbarHandler = (path) => {
    router.push(path)
  }
  return (
    <nav className='flex justify-center'>
        <div className='fixed top-4 w-5xl bg-white/10 px-5 py-4 rounded-4xl z-20 border-2 border-blue-700'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <div className=''><Image src='/logo2.png' alt='logo' height={30} width={30}/></div>
                    <div>
                        <span className='text-xl text-blue-600 font-bold font-serif'>DocMind AI</span>
                        {/* <p className='text-xs text-slate-500 italic font-serif'>PDFs with AI Intelligence</p> */}
                    </div>
                </div>

                <div className='flex'>
                    {
                        NavbarItems.map((item, index) => {
                            return (
                                <div onClick={() => navbarHandler(item.path)}  key={index} className='flex items-center gap-2 hover:bg-white/5 duration-300 px-3 py-1.5 rounded-xl text-white cursor-pointer'>
                                    <span className='w-7 h-7 cursor-pointer'>{item.icon}</span>
                                    <span className='font-semibold cursor-pointer text-[16px]'>{item.text}</span>
                                </div>
                            )}
                        )
                    }

                    <div className='flex items-center pl-2 text-white cursor-pointer'>
                        <MoonIcon size={20}/>
                        {/* Dark Mode */}
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
