'use client'
import { InfoIcon, UploadCloudIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'

const Dashboardpage = () => {
    const pdfRef = useRef();
  return (
    <div className='pl-64 pt-[10vh] text-white'>
        <div className='flex flex-col items-center'>
            <div className='text-center mb-[7vh]'>
                <h1 className='text-3xl font-bold font-serif'>Welcome To <span className='text-blue-700'>Admin Dashboard</span> <span>- DocMind AI</span></h1>
                <span className="text-slate-400 mt-2">Efficiently manage, organize, and monitor all your PDFs with AI-powered insights and tools.</span>
            </div>

            <div>
                <div onClick={()=> pdfRef.current.click()} className='min-w-[60vw] min-h-[45vh] border-2 border-slate-500 border-y-slate-400 border-dotted rounded-xl bg-black/10 backdrop-blur-lg flex flex-col items-center gap-1 justify-center cursor-pointer'>
                    <Image className='mb-5' src='/PDF.png' alt='PDFpng' width={50} height={50} />
                    <span className='text-sm font-semibold text-slate-500'>Upload or drag a file here</span>
                    <span className='text-sm text-slate-500 flex items-center gap-1'>Supported file format is only PDF, size : 10MB <InfoIcon size={15} className='mt-0.5'/></span>

                    <input ref={pdfRef} type='file' className='hidden'/>
                    <button onClick={()=> pdfRef.current.click()} className='mt-5 px-4 py-2 border-2 border-slate-500 rounded-lg cursor-pointer flex justify-center items-center gap-2 font-bold bg-[#0f172b] hover:bg-blue-700 group duration-300'><UploadCloudIcon className='text-blue-700 group-hover:text-white duration-300' strokeWidth={3}/> Upload a File</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboardpage
