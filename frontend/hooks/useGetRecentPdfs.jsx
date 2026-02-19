'use client';
import { setRecentPDF } from '@/app/redux/recentPDFSlice';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetRecentPdfs = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchRecentPdfs = async()=>{
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/pdf/getlatest`, {withCredentials:true});
            if(res.data.success){
                // console.log(res.data);
                dispatch(setRecentPDF(res.data.pdfs));            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchRecentPdfs();
  },[]);
};

export default useGetRecentPdfs;