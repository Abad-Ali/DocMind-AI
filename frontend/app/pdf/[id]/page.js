'use client'
import AiBar from '@/components/AiBar';
import FeatureBar from '@/components/FeatureBar';
import PDFViewer from '@/components/PDFViewer';
import { Button } from '@/components/ui/button';
import useGetPDF from '@/hooks/useGetPDF';
import { Sparkles } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const PDFpage = () => {
    const params = useParams();
    const paramsId = params.id;
    const [show, setShow] = useState(false);

    useGetPDF(paramsId);

    const {pdf} = useSelector(store=>store.pdf)
    if (!pdf) return <div>Loading...</div>;
  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center mt-0.5'><PDFViewer url={pdf.fileUrl}/></div>
      <AiBar pdfId={paramsId}/>

      <div className='absolute left-[41vw] top-5.5'>
        <Button onClick={()=>setShow(!show)}><Sparkles/> Feature Bar</Button>
      </div>
      <FeatureBar show={show}/>
    </div>
  )
}

export default PDFpage
