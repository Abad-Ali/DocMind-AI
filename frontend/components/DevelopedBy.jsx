import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import {motion} from 'framer-motion';

const DevelopedBy = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 2, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            DocMind AI developed By
          </h2>
          <p className="text-[15px] lg:text-[17px] text-slate-400 mt-2 px-3">
           A personal project by Abad Ali demonstrating AI-powered PDF tools.
          </p>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 mb-8'>
            <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 3,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="relative"
              >
                {/* Rotating border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-[-6px] rounded-full border-[3] border-e-blue-700 border-l-blue-700 border-b-[#0f172b] border-t-[#0f172b]"
                />
      
                {/* Glow pulse */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl"
                />
      
                <Avatar className="w-36 h-36 border-4 border-blue-500 shadow-2xl shadow-blue-500/30 relative z-10">
                  <AvatarImage
                    src="https://github.com/Abad-Ali.png"
                    alt="Profile_pic"
                  />
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
            </motion.div>

            <div className='flex flex-col justify-center items-center gap-0.5'>
                <Link href='https://github.com/Abad-Ali' target='_blank'><span className='text-lg text-blue-700 font-serif font-semibold'>Abad Ali</span></Link>
                <p className='max-w-2xl text-center text-xs lg:text-sm text-slate-400 font-semibold px-3 lg:px-0'>This project is a personal initiative by a college student, utilizing free AI API keys. Some features may have limited availability due to API rate limits, but it demonstrates the potential of AI-powered PDF tools.</p>
            </div>
        </div>
    </motion.div>
  )
}

export default DevelopedBy
