'use client';
import { setPDF } from '@/app/(main)/redux/pdfSlice';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetPDF = (pdfId) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchPDF = async()=>{
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/pdf/getpdf/${pdfId}`, {withCredentials:true});
            if(res.data.success){
                // console.log(res.data);
                dispatch(setPDF(res.data.pdf));            
            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchPDF();
  },[pdfId]);
};

export default useGetPDF;