'use client'
import RecentPdfs from '@/components/RecentPdfs'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const explorePage = () => {
  return (
    <div className='pt-[10vh] text-white pl-64'>
        <div className='flex flex-col items-center'>
            <div className="text-center mt-10">
              <h1 className="text-4xl font-bold">Explore PDFs</h1>
              <p className="text-gray-500 mt-2 font-medium">
                Discover recently uploaded documents from our community.
              </p>
            </div>
            <Link href='/search'><div className="relative w-sm mt-5 mb-10">
              <Input placeholder="Search PDFs using title" className="pr-10 rounded-full bg-white border-2 border-blue-700 py-5 font-semibold italic"/>
              <SearchIcon strokeWidth={3} className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div></Link>
        </div>
        <RecentPdfs/>
    </div>
  )
}

export default explorePage
