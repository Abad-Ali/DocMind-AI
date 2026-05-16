'use client'
import RecentPdfs from '@/components/RecentPdfs'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {motion} from 'framer-motion';

const explorePage = () => {
  return (
    <div className='pt-[7vh] lg:pt-[10vh] text-white lg:pl-64 min-h-screen'>
        <div className='flex flex-col items-center'>
            <motion.div initial={{ opacity: 0, x: -70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="text-center mt-10">
              <h1 className="text-3xl lg:text-4xl font-bold">Explore PDFs</h1>
              <p className="text-gray-500 mt-2 text-[15px] lg:text-[17px] font-medium p-3">
                Discover recently uploaded documents from our community.
              </p>
            </motion.div>
            <Link href='/search'><motion.div initial={{ opacity: 0, x: 70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="relative w-xs sm:w-sm mt-5 mb-10">
              <Input placeholder="Search PDFs using title" className="pr-10 rounded-full bg-white border-2 border-blue-700 py-5 font-semibold italic"/>
              <SearchIcon strokeWidth={3} className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </motion.div></Link>
        </div>
        <RecentPdfs/>
    </div>
  )
}

export default explorePage
