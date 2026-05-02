'use client'
import AiBar from '@/components/AiBar';
import PDFViewer from '@/components/PDFViewer';
import useGetPDF from '@/hooks/useGetPDF';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const PDFpage = () => {
    const params = useParams();
    const paramsId = params.id;

    useGetPDF(paramsId);

    const {pdf} = useSelector(store=>store.pdf)
    if (!pdf) return <div>Loading...</div>;
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex justify-center items-center mt-0.5'><PDFViewer url={pdf.fileUrl} pdfId={paramsId}/></div>
      <AiBar pdfId={paramsId}/>
    </div>
  )
}

export default PDFpage
