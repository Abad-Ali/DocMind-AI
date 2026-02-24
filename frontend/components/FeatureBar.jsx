import { BookMarkedIcon, DownloadIcon, FileText, HelpCircle, LucideMail, MessageSquare, Share2 } from 'lucide-react'
import React from 'react'

const FeatureBar = ({show}) => {
    if (!show) return null;
  return (
    <div className='absolute bottom-5 bg-white/10 backdrop-blur-xs px-2 py-3 border-2 border-slate-500 rounded-2xl'>
      <div className='flex justify-center items-center gap-1'>
        <div className='p-2 bg-black/5 rounded-lg border-2 border-slate-500 hover:scale-110 duration-300 cursor-pointer'><FileText/></div>
        <div className='p-2 bg-black/5 rounded-lg border-2 border-slate-500 hover:scale-110 duration-300 cursor-pointer'><HelpCircle/></div>
        <div className='p-2 bg-black/5 rounded-lg border-2 border-slate-500 hover:scale-110 duration-300 cursor-pointer'><BookMarkedIcon/></div>
        <div className='p-2 bg-black/5 rounded-lg border-2 border-slate-500 hover:scale-110 duration-300 cursor-pointer'><DownloadIcon/></div>
        <div className='p-2 bg-black/5 rounded-lg border-2 border-slate-500 hover:scale-110 duration-300 cursor-pointer'><Share2/></div>
        <div className='p-2 bg-black/5 rounded-lg border-2 border-slate-500 hover:scale-110 duration-300 cursor-pointer'><LucideMail/></div>
        <div className='p-2 bg-black/5 rounded-lg border-2 border-slate-500 hover:scale-110 duration-300 cursor-pointer'><MessageSquare/></div>
      </div>
    </div>
  )
}

export default FeatureBar
