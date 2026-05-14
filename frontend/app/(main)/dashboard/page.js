'use client'
import { Button } from '@/components/ui/button'
import useGetUploadedPdfs from '@/hooks/useGetUploadedPdfs'
import { Edit3Icon, FileEdit, InfoIcon, Loader2Icon, UploadCloud, UploadCloudIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import axios from 'axios'
import { toast } from 'sonner'
import { addPdf, removePdf, updatePdf } from '../redux/pdfSlice'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import AIOrb from '@/components/AiAnimatedLogo'
import { motion } from 'framer-motion'

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
    const [isAgreed,setIsAgreed] = useState(false);
    const [uploadForm,setUploadForm] = useState(false);

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
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pdf/edit/${selectedPdf.id}`, input, {withCredentials:true});

            if(res.data.success){
                const updatedPdf = res.data.pdf;
                dispatch(updatePdf({
                  id: updatedPdf._id,
                  title: updatedPdf.title,
                  description: updatedPdf.description,
                  author: updatedPdf.author,
                  fileUrl: updatedPdf.fileUrl,
                //   uploadedBy: updatedPdf.uploadedBy,
                //   uploadedAt: updatedPdf.uploadedAt
                }));

                toast.success(res.data.message);
                setOpen(false);
                setPdfAction("");
            }
        } catch (error) {
           toast.error(error.response.data.message); 
        }finally{
            setloading(false);
        }
    }

    const enhanceTitleHandler = async()=>{
        setloading(true)
        setInput(prev => ({ ...prev, title: "AI is thinking..."}));
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pdf/enhance-title`, {title : input.title}, {withCredentials:true});
            if(res.data.success){
                const aiTitle = res.data.aiEnhanceTitle;
                setInput(prev => ({ ...prev, title: aiTitle}));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setloading(false);
        }
    }

    const enhanceDescriptionHandler = async()=>{
        setloading(true)
        setInput(prev => ({ ...prev, description: "AI is thinking..."}));
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pdf/enhance-description`, {description : input.description}, {withCredentials:true});
            if(res.data.success){
                const aiDescription = res.data.aiEnhanceDescription;
                setInput(prev => ({ ...prev, description: aiDescription}));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setloading(false);
        }
    }

    const deletePdfHandler = async()=>{
        setPdfAction("");
        setloading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pdf/delete/${selectedPdf.id}`, {}, {withCredentials:true});
            if(res.data.success){
                dispatch(removePdf(selectedPdf.id));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setloading(false);
            setOpen(false);
        }
    }


    const handleFileChange = (e) => {
      const file = e.target.files[0];
    
      if (!file) return;
    
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed");
        return;
      }
    
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be under 10MB");
        return;
      }
    
      setSelectedPdf(file);
      setUploadForm(true);
    };

    const uploadPDFHandler = async()=>{
        setloading(true);
        console.log(input);
        if(isAgreed === false){
            toast.error("Please agree to the terms and conditions to continue.");
            setloading(false);
            return
        }
        try {
            const formData = new FormData();
            formData.append("title", input.title);
            formData.append("description", input.description);
            formData.append("author", input.author);
            formData.append("pdfFile", selectedPdf);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pdf/upload`, formData, {withCredentials:true});

            if(res.data.success){
                dispatch(addPdf(res.data.pdf))
                toast.success(res.data.message);
                setInput({
                    title:"",
                    description:"",
                    author:""
                })
                setUploadForm(false);
                setIsAgreed(false);
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setloading(false);
        }
    }
  return (
    <div className='lg:pl-64 pt-[15vh] text-white'>
        <div className='flex flex-col items-center h-screen'>
            <div className='flex flex-col items-center mb-[7vh] px-3 lg:px-0'>
                <motion.h1 initial={{ opacity: 0, x: -70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className='text-2xl sm:text-3xl font-bold font-serif w-[80vw] lg:w-full text-center'>Welcome To <span className='text-blue-700'>Admin Dashboard</span> <span>- DocMind AI</span></ motion.h1>
                <motion.span initial={{ opacity: 0, x: 70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="text-[15px] lg:text-[17px] text-slate-400 mt-2 text-center">Efficiently manage, organize, and monitor all your PDFs with AI-powered insights and tools.</motion.span>
            </div>

            <div>
                <motion.div initial={{ opacity: 0, y: 30 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className='flex justify-center items-center pb-5 lg:pb-7'>
                    <div className='bg-black/10 border-[1] border-slate-500 w-fit rounded-lg flex gap-1 p-1'>
                        <Button onClick={()=>setActiveButton("upload")} className={`${activeButton === 'upload' ? 'bg-blue-700 hover:bg-blue-800' : ''} cursor-pointer`}><UploadCloud strokeWidth={3}/>Upload PDF</Button>
                        <Button onClick={()=>setActiveButton("edit")} className={`${activeButton === 'edit' ? 'bg-blue-700 hover:bg-blue-800' : ''} cursor-pointer`}><Edit3Icon strokeWidth={3}/>Edit PDF</Button>
                    </div>
                </motion.div>
                
                {
                    activeButton === "upload" && (
                        <motion.div initial={{ opacity: 0, y: 70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 2, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className='min-w-[60vw] min-h-[45vh] border-2 border-slate-500 border-y-slate-400 rounded-xl bg-black/10 backdrop-blur-xs backdrop-brightness-200 flex flex-col items-center gap-1 justify-center cursor-pointer'>
                            <Image className='mb-5' src='/PDF.png' alt='PDFpng' width={50} height={50} />
                            <span className='text-sm font-semibold text-slate-500'>Upload a PDF file here</span>
                            <span className='text-sm text-slate-500 flex items-center gap-1 px-3'>Supported file format is only PDF, size : 10MB <InfoIcon size={15} className='mt-0.5'/></span>
        
                            <input accept="application/pdf" onChange={handleFileChange} ref={pdfRef} type='file' className='hidden'/>
                            <button onClick={()=> pdfRef.current.click()} className='mt-5 px-4 py-2 border-2 border-slate-500 rounded-lg cursor-pointer flex justify-center items-center gap-2 font-bold bg-[#0f172b] hover:bg-blue-700 group duration-300'><UploadCloudIcon className='text-blue-700 group-hover:text-white duration-300' strokeWidth={3}/> Upload a File</button>
                        </motion.div>
                    )
                }
                
                <Dialog open={uploadForm} onOpenChange={setUploadForm}>
                  <DialogContent className="sm:max-w-[450] max-h-[70vh] overflow-hidden bg-black">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-bold text-white text-center">
                        <div className='my-2 flex flex-col items-center'>
                            <h3>Enter PDF Details</h3>
                            <span className='text-sm font-semibold text-slate-400'>Upload your PDF file and fill in the details.</span>
                        </div>
                        </DialogTitle>
                    </DialogHeader>
                    <div className='overflow-hidden'>
                       <div className='text-white overflow-hidden'>
                            <form className='flex flex-col gap-3 overflow-hidden'>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor="title" className='font-serif ml-1'>Title : </Label> 
                                    <div className='flex items-center'>
                                        <Input type="title" name="title" value={input.title} onChange={handleChange} id='title' className='bg-white text-black h-10 rounded-l-lg rounded-r-none focus-visible:ring-transparent' required placeholder="Enter the title for PDF"/>
                                        <button disabled={loading} onClick={enhanceTitleHandler} className={`bg-slate-50 h-10 flex justify-center items-center rounded-r-lg ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}><AIOrb size={50}/></button>
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
                                        <button disabled={loading} onClick={enhanceDescriptionHandler} className={`bg-slate-50 h-16 flex justify-center items-center rounded-r-lg ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}><AIOrb size={50}/></button>
                                    </div>
                                    <div className='text-slate-400 text-sm flex'>
                                        <input onClick={()=>setIsAgreed(true)} type="checkbox" className='mx-1 cursor-pointer'/>
                                        <span className='flex gap-1'>
                                          I agree to <p className='hover:text-blue-600 hover:underline'>Terms & Conditions</p>
                                        </span>
                                    </div>
                                </div>
                               
                               {
                                loading ? (
                                    <Button disabled onClick={uploadPDFHandler} type='button' className='mt-1 cursor-pointer'><Loader2Icon className='animate-spin'/>Uploading PDF...</Button>
                                ):(
                                    <Button onClick={uploadPDFHandler} type='button' className='mt-1 cursor-pointer'>Upload PDF</Button>
                                )
                               }

                            </form>
                        </div> 
                    </div>
                  </DialogContent>
                </Dialog>


                {
                    activeButton === "edit" && (
                        <motion.div initial={{ opacity: 0, y: 70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className='min-w-[80vw] lg:min-w-[60vw] lg:min-h-[60vh] border-2 border-slate-500 border-y-slate-400 rounded-xl bg-black/10 backdrop-blur-xs backdrop-brightness-200 flex flex-col items-center gap-1 cursor-pointer'>
                            <div className="flex items-center gap-2 text-xl lg:text-2xl font-semibold py-3"><FileEdit className="w-7 h-7" />Select a PDF to Edit</div>

                            <section className='overflow-y-auto min-h-[50vh] min-w-[57vw] max-h-[50vh] max-w-[70vw] lg:max-w-[57vw] scroll-hide scrollable'>
                                <div className='flex justify-center items-center gap-0 flex-wrap'>
                                    {
                                      uploadedPDFS.map(pdf => (
                                            <div onClick={()=>selectpdfHandler(pdf)} key={pdf.id}>
                                                <motion.div initial={{ opacity: 0, y: 70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="relative w-[200] lg:w-[250] h-[270] lg:h-[300] rounded-2xl overflow-hidden scale-95 hover:scale-100 duration-300 border-2 hover:border-blue-700">
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
    
                                                            <div className='overflow-y-auto max-h-[75] scroll-hide scrollable'>
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
                                                </motion.div>
                                            </div>
                                        ))  
                                    }
                                </div>
                            </section>
                        </motion.div>
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
                    <AlertDialogContent className='lg:!max-w-[27vw] bg-black/95'>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-white'>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className='text-slate-200'>
                          This action cannot be undone. This will permanently delete your PDF from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <hr className='my-0.5'/>
                      <AlertDialogFooter>
                        <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                        {
                            loading ? (
                                <AlertDialogAction disabled onClick={deletePdfHandler} className='cursor-pointer'><Loader2Icon className='animate-spin'/>Deleting PDF...</AlertDialogAction>
                            ):(
                                <AlertDialogAction onClick={deletePdfHandler} className='cursor-pointer'>Delete PDF</AlertDialogAction>
                            )
                        }
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
                                    <button type='button' disabled={loading} onClick={enhanceTitleHandler} className={`bg-slate-50 h-10 flex justify-center items-center rounded-r-lg ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}><AIOrb size={50}/></button>
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
                                    <button type='button' disabled={loading} onClick={enhanceDescriptionHandler} className={`bg-slate-50 h-16 flex justify-center items-center rounded-r-lg ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}><AIOrb size={50}/></button>
                                </div>
                            </div>

                            {
                                loading ? (
                                    <Button disabled type='submit' className='mt-1 cursor-pointer'><Loader2Icon className='animate-spin'/>Updating Details...</Button>
                                ):(
                                    <Button type='submit' className='mt-1 cursor-pointer'>Update Details</Button>
                                )
                            }
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
