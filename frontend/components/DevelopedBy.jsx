import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

const DevelopedBy = () => {
  return (
    <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            DocMind AI developed By
          </h2>
          <p className="text-[15px] lg:text-[17px] text-slate-400 mt-2">
           A personal project by Abad Ali demonstrating AI-powered PDF tools.
          </p>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 mb-8'>
            <div>
                <Avatar className="w-30 h-30">
                  <AvatarImage src={'https://github.com/Abad-Ali.png'} alt="Profile_pic"/>
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
            </div>

            <div className='flex flex-col justify-center items-center gap-0.5'>
                <Link href='https://github.com/Abad-Ali' target='_blank'><span className='text-lg text-blue-700 font-serif font-semibold'>Abad Ali</span></Link>
                <p className='max-w-2xl text-center text-xs lg:text-sm text-slate-400 font-semibold px-3 lg:px-0'>This project is a personal initiative by a college student, utilizing free AI API keys. Some features may have limited availability due to API rate limits, but it demonstrates the potential of AI-powered PDF tools.</p>
            </div>
        </div>
    </div>
  )
}

export default DevelopedBy
