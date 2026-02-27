'use client'
import { Button } from '@/components/ui/button'
import useGetUploadedPdfs from '@/hooks/useGetUploadedPdfs'
import { Edit3Icon, FileEdit, InfoIcon, UploadCloud, UploadCloudIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const Dashboardpage = () => {
    const [activeButton, setActiveButton] = useState("upload");
    const pdfRef = useRef();
    useGetUploadedPdfs();
    const { uploadedPDFS }= useSelector(store=>store.pdf);
  return (
    <div className='pl-64 pt-[10vh] text-white'>
        <div className='flex flex-col items-center h-screen'>
            <div className='text-center mb-[7vh]'>
                <h1 className='text-3xl font-bold font-serif'>Welcome To <span className='text-blue-700'>Admin Dashboard</span> <span>- DocMind AI</span></h1>
                <span className="text-slate-400 mt-2">Efficiently manage, organize, and monitor all your PDFs with AI-powered insights and tools.</span>
            </div>

            <div>
                <div className='flex justify-center items-center pb-7'>
                    <div className='bg-black/10 border-[1] border-slate-500 w-fit rounded-lg flex gap-1 p-1'>
                        <Button onClick={()=>setActiveButton("upload")} className={`${activeButton === 'upload' ? 'bg-blue-700 hover:bg-blue-800' : ''} cursor-pointer`}><UploadCloud strokeWidth={3}/>Upload PDF</Button>
                        <Button onClick={()=>setActiveButton("edit")} className={`${activeButton === 'edit' ? 'bg-blue-700 hover:bg-blue-800' : ''} cursor-pointer`}><Edit3Icon strokeWidth={3}/>Edit PDF</Button>
                    </div>
                </div>
                
                {
                    activeButton === "upload" && (
                        <div onClick={()=> pdfRef.current.click()} className='min-w-[60vw] min-h-[45vh] border-2 border-slate-500 border-y-slate-400 rounded-xl bg-black/10 backdrop-blur-lg flex flex-col items-center gap-1 justify-center cursor-pointer'>
                            <Image className='mb-5' src='/PDF.png' alt='PDFpng' width={50} height={50} />
                            <span className='text-sm font-semibold text-slate-500'>Upload or drag a file here</span>
                            <span className='text-sm text-slate-500 flex items-center gap-1'>Supported file format is only PDF, size : 10MB <InfoIcon size={15} className='mt-0.5'/></span>
        
                            <input ref={pdfRef} type='file' className='hidden'/>
                            <button onClick={()=> pdfRef.current.click()} className='mt-5 px-4 py-2 border-2 border-slate-500 rounded-lg cursor-pointer flex justify-center items-center gap-2 font-bold bg-[#0f172b] hover:bg-blue-700 group duration-300'><UploadCloudIcon className='text-blue-700 group-hover:text-white duration-300' strokeWidth={3}/> Upload a File</button>
                        </div>
                    )
                }

                {
                    activeButton === "edit" && (
                        <div className='min-w-[60vw] min-h-[60vh] border-2 border-slate-500 border-y-slate-400 rounded-xl bg-black/10 backdrop-blur-lg flex flex-col items-center gap-1 cursor-pointer'>
                            <div className="flex items-center gap-2 text-2xl font-semibold py-3"><FileEdit className="w-7 h-7" />Select a PDF to Edit</div>

                            <section className='overflow-y-auto min-h-[50vh] min-w-[57vw] max-h-[50vh] max-w-[57vw] scroll-hide scrollable'>
                                <div className='flex justify-center items-center gap-0 flex-wrap'>
                                    {
                                      uploadedPDFS.map(pdf => (
                                            <div key={pdf.id}>
                                                <div className="relative w-[250] h-[300] rounded-2xl overflow-hidden scale-95 hover:scale-100 duration-300 border-2 hover:border-blue-700">
                                                    <img
                                                      src={pdf.previewUrl}
                                                      className="rounded-2xl w-full h-full"
                                                    />
                                                    <div className="absolute bottom-0 bg-black/20 backdrop-blur-lg min-w-full min-h-[200] rounded-2xl text-black">
                                                        <div className="m-3 mt-5">
                                                            <div>
                                                                <span className="text-[17px] font-serif font-semibold">Title: </span>
                                                                <span className="text-[17px] font-sans font-semibold">{pdf.title}</span>
                                                            </div>
    
                                                            <div>
                                                                <span className="text-[17px] font-serif font-semibold">Description: </span>
                                                                <span className="text-[17px] font-sans font-semibold">{pdf.description}</span>
                                                            </div>
    
                                                            <div>
                                                                <span className="text-[17px] font-serif font-semibold">Author: </span>
                                                                <span className="text-[17px] font-sans font-semibold">{pdf.author}</span>
                                                            </div>
    
                                                            <div>
                                                                <span className="text-[17px] font-serif font-semibold">Upload by: </span>
                                                                <span className="text-[17px] font-sans font-semibold text-blue-700">{pdf.uploadedBy.username}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))  
                                    }
                                </div>
                            </section>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Dashboardpage
