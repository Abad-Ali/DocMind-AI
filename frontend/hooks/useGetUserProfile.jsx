'use client';
import { setBookmarks, setUserProfile } from '@/app/(main)/redux/authSlice';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetUserProfile = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchUserProfile = async()=>{
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/myprofile`, {withCredentials:true});
            if(res.data.success){
                // console.log(res.data);
                dispatch(setUserProfile(res.data.user));            
                dispatch(setBookmarks(res.data.bookmarks));            
            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchUserProfile();
  },[]);
};

export default useGetUserProfile;