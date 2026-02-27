'use client';
import { setUploadedPDF } from '@/app/(main)/redux/pdfSlice';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetUploadedPdfs = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchUploadedPDF = async()=>{
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/pdf/getuploaded`, {withCredentials:true});
            if(res.data.success){
                // console.log(res.data);
                dispatch(setUploadedPDF(res.data.pdfs));            
            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchUploadedPDF();
  },[]);
};

export default useGetUploadedPdfs;