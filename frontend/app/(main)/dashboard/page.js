'use client'
import { Button } from '@/components/ui/button'
import useGetUploadedPdfs from '@/hooks/useGetUploadedPdfs'
import { Edit3Icon, FileEdit, InfoIcon, UploadCloud, UploadCloudIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import axios from 'axios'
import { toast } from 'sonner'
import { removePdf, updatePdf } from '../redux/pdfSlice'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import AIOrb from '@/components/AiAnimatedLogo'

const Dashboardpage = () => {
    const [activeButton, setActiveButton] = useState("upload");
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [open, setOpen] = useState(false);
    const [pdfAction, setPdfAction] = useState("");
    const [loading, setloading] = useState(false);
    const [input, setInput] = useState({
        title:"",
        description:"",
        author:""
    });

    const pdfRef = useRef();

    useGetUploadedPdfs();
    const { uploadedPDFS }= useSelector(store=>store.pdf);
    const dispatch = useDispatch();

    const selectpdfHandler = (pdf)=>{
        setOpen(true);
        setSelectedPdf(pdf)
        // console.log(pdf);
    }

    const handleChange = (e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    };

    useEffect(() => {
        if (selectedPdf) {
            setInput({
                title: selectedPdf.title || "",
                description: selectedPdf.description || "",
                author: selectedPdf.author || ""
            });
        }
    }, [selectedPdf]);

    const editPdfHandler = async(e)=>{
        e.preventDefault();
        console.log(input);
        setloading(true);
        try {
            const res = await axios.put(`http://localhost:8000/api/v1/pdf/edit/${selectedPdf.id}`, input, {withCredentials:true});

            if(res.data.success){
                const updatedPdf = res.data.pdf;
                dispatch(updatePdf({
                  id: updatedPdf._id,
                  title: updatedPdf.title,
                  description: updatedPdf.description,
                  author: updatedPdf.author,
                  fileUrl: updatedPdf.fileUrl,
                  uploadedBy: updatedPdf.uploadedBy,
                  uploadedAt: updatedPdf.uploadedAt
                }));

                toast.success(res.data.message);
                setOpen(false);
                setPdfAction("");
            }
        } catch (error) {
           toast.error(error.response.data.message); 
        }
    }

    const deletePdfHandler = async()=>{
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/pdf/delete/${selectedPdf.id}`, {}, {withCredentials:true});
            if(res.data.success){
                dispatch(removePdf(selectedPdf.id));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
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
                                            <div onClick={()=>selectpdfHandler(pdf)} key={pdf.id}>
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

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="sm:max-w-sm max-h-[70vh] overflow-y-auto bg-black/20 backdrop-blur-xs">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-bold text-white">Choose an action</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col gap-5'>
                        <div>
                            <p className='text-slate-200'>Select an action for this item.</p>
                            <p className='text-sm text-slate-300'>Editing will update it, while deleting will remove it permanently.</p>
                        </div>

                        <div className='flex gap-3'>
                            <Button onClick={()=>setPdfAction("editPdf")} className='cursor-pointer'>Edit PDF</Button>
                            <Button onClick={()=>setPdfAction("deletePdf")} className='cursor-pointer'>Delete PDF</Button>
                        </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <AlertDialog open={pdfAction === "deletePdf"} 
                    onOpenChange={(open) => {
                      if (!open) setPdfAction("")
                    }}
                >
                    <AlertDialogContent className='!max-w-[27vw] bg-black/95'>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-white'>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className='text-slate-200'>
                          This action cannot be undone. This will permanently delete your PDF from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <hr className='my-0.5'/>
                      <AlertDialogFooter>
                        <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deletePdfHandler} className='cursor-pointer'>Delete PDF</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


                <Dialog open={pdfAction === "editPdf"} 
                     onOpenChange={(open) => {
                      if (!open) setPdfAction("")
                    }}
                >
                  <DialogContent className="sm:max-w-lg max-h-[70vh] overflow-hidden bg-black/95 backdrop-blur-xs">
                    <DialogHeader>
                      <DialogTitle>
                        <div className='my-2 flex flex-col items-center'>
                            <span className="text-lg font-bold text-white flex items-center gap-1"><Edit3Icon strokeWidth={3} size={17}/>Edit PDF</span>
                            <span className='text-sm font-semibold text-slate-400'>Update and modify your uploaded PDFs with ease</span>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    <div className='text-white overflow-hidden'>
                        <form onSubmit={editPdfHandler} className='flex flex-col gap-3 overflow-hidden'>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="title" className='font-serif ml-1'>Title : </Label> 
                                <div className='flex items-center'>
                                    <Input type="title" name="title" value={input.title} onChange={handleChange} id='title' className='bg-white text-black h-10 rounded-l-lg rounded-r-none focus-visible:ring-transparent' required placeholder="Enter the title for PDF"/>
                                    <div className='bg-slate-50 h-10 flex justify-center items-center rounded-r-lg cursor-pointer'><AIOrb size={50}/></div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="author" className='font-serif ml-1'>Author :</Label> 
                                <Input type="author" name="author" value={input.author} onChange={handleChange} id='author' className='bg-white text-black h-10 focus-visible:ring-transparent' required placeholder="Enter the author of the PDF"/>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="description" className='font-serif ml-1'>Description :</Label> 
                                <div className='flex items-center'>
                                    <Textarea type="description" name="description" value={input.description} onChange={handleChange} id='description' className='bg-white text-black max-h-16 rounded-l-lg rounded-r-none focus-visible:ring-transparent' required placeholder="Enter the description for PDF"/>
                                    <div className='bg-slate-50 h-16 flex justify-center items-center rounded-r-lg cursor-pointer'><AIOrb size={50}/></div>
                                </div>
                            </div>

                            <Button type='submit' className='mt-1 cursor-pointer'>Update Details</Button>
                        </form>
                    </div>
                  </DialogContent>
                </Dialog>
            </div>
        </div>
    </div>
  )
}

export default Dashboardpage
