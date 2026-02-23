'use client'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { ArrowRight, BrushCleaningIcon, GlobeIcon, SearchIcon, SearchXIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const searchPage = () => {
  const [input,setInput] = useState({title:""});
  const [results, setResults] = useState([]);
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const handleChange = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  };

  const searchHandle = async(e)=>{
    e.preventDefault();
    // console.log(input)
    setloading(true);
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/pdf/search`, input,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
      });

      if(res.data.success){
        setResults(res.data.pdfs);
        toast.success(res.data.message);
        setInput({title:""});
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setloading(false);
    }
  }

  const cleanSearch = ()=>{
    if(results.length > 0){
      setResults("");
      toast.success("Search clear successfully.");
    }
    return
  }
  return (
    <div className='pt-[10vh] pl-64 flex flex-col items-center text-white'>
        <div className="px-10 pb-10">

          <div className="text-center mt-10">
            <h1 className="text-4xl font-bold">Search PDFs</h1>
            <p className="text-gray-500 mt-2 font-medium">
              Find documents by title or keyword
            </p>
          </div>
        
          <div className="flex justify-center mt-2 mb-3">
                <form onSubmit={searchHandle} className="relative w-sm mt-5 mb-10">
                  <Input name='title' value={input.title} onChange={handleChange} placeholder="Search PDFs using title" className="pr-10 rounded-full bg-white text-black font-semibold italic border-2 border-blue-700 py-5"/>
                  <button disabled={loading} type='submit' className="absolute right-3 top-1/2 -translate-y-1/2"><SearchIcon className="h-4 w-4 text-blue-700" strokeWidth={3}/></button>
                </form>
          </div>
        
          <div className='bg-black/10 backdrop-blur-xs p-3 rounded-lg w-2xl border-2 border-slate-500'>
            <div className='flex justify-between text-slate-300'>
              <span className='font-semibold'>Search Results : ({results.length})</span>
              <span onClick={cleanSearch} className='font-semibold flex gap-1 cursor-pointer hover:text-blue-700'><BrushCleaningIcon size={20}/>Clean</span>
            </div>

            <div className='flex justify-center min-h-56 max-h-56 my-7 overflow-y-scroll scroll-hide scrollable'>
              {results.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-center items-center">
                  {results.map(pdf => (
                    <div key={pdf.id} className='flex gap-3 border-2 border-slate-500 rounded-xl px-3 py-3 pr-5 min-w-xl'>
                      <div className='w-[70px] h-[70px]'><img src={pdf.previewUrl} alt="pdf_img" className='w-full h-full rounded-sm'/></div>

                      <div className='w-full'>
                        <div className='text-sm font-semibold'>
                          <span>Title: </span>
                          <span>{pdf.title}</span>
                        </div>

                        <div className='text-sm font-semibold'>
                          <span>Description: </span>
                          <span>{pdf.description}</span>
                        </div>

                        <div className='flex justify-between items-center'>
                          <div className='text-sm font-semibold'>
                            <span>Author: </span>
                            <span>{pdf.author}</span>
                          </div>

                          <div className='text-sm font-semibold'>
                            <span className='text-slate-400'>Upload by: </span>
                            <span className='text-blue-700'>{pdf.uploadedBy.username}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                loading ? (
                    <div className='flex justify-center items-center'>
                      <div className='flex flex-col items-center gap-1'>
                        <Image src="/logo2.png" alt="loader" height={50} width={50} className="animate-spin [animation-duration:.7s]"/>
                        <span className='font-bold'>Please wait...</span>
                      </div>
                    </div>
                  ):(
                  <div className='text-center flex flex-col items-center justify-center'>
                    <div className='w-fit p-3 rounded-full text-slate-500 border-4 border-slate-500'><SearchXIcon strokeWidth={3}/></div>
                    <span className='text-slate-500 text-xl font-bold mt-1'>No Search</span>
                    <p className='text-slate-500 font-semibold'>When you search result will be display here.</p>
                  </div>
                )
              )}
            </div>
          </div>

        </div>

      <div className='flex flex-col items-center pb-10'>
        <div className='flex flex-col items-center gap-1'>
          <span className="text-3xl font-bold">Don't know what to search?</span>
          <p className="text-slate-500 font-medium max-w-md">Explore trending and popular PDFs curated for you.</p>
        </div>
        <button onClick={()=>router.push('/explore')} className="bg-blue-700 px-4 py-2.5 rounded-2xl font-semibold cursor-pointer flex gap-1 items-center mt-2 hover:bg-blue-800 duration-300"><GlobeIcon/> Explore New PDFs <ArrowRight/></button>
      </div>
    </div>
  )
}

export default searchPage
