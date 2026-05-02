import { setBookmarks } from '@/app/(main)/redux/authSlice';
import axios from 'axios';
import { BookMarkedIcon, CopyIcon, DownloadIcon, FileText, HelpCircle, LucideMail, MessageSquare, Share2 } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const FeatureBar = ({show, pdfId}) => {
  if (!show) return null;
  const dispatch = useDispatch();

  const bookmarkHandler = async()=>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/pdf/${pdfId}/bookmark`,{
          withCredentials: true 
        }
      )

      if(res.data.success){
        dispatch(setBookmarks);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const downloadPdfHandler = async()=>{
    try {
      // const res = await axios.get(`http://localhost:8000/api/v1/pdf/download/${pdfId}`,{
      //     withCredentials: true 
      //   }
      // )
      window.open(`http://localhost:8000/api/v1/pdf/download/${pdfId}`);
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(message);
    }
  }

  const copyLinkHandler = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    } catch (error) {
      toast.error("Failed to copy link:", error);
    }
  };

  const handleShare = () => {
    const pdfUrl = `${window.location.origin}/pdf/${pdfId}`;
  
    if (navigator.share) {
      navigator.share({ title: 'Check out the new PDF on DocMind AI!', url: pdfUrl })
        .then(() => toast.success('PDF is ready to share!'))
        .catch(err => console.error(err));
    } else {
      navigator.clipboard.writeText(pdfUrl)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => console.error('Failed to copy link.'));
    }
  };

  return (
    <div className='absolute bottom-3 bg-black/95 px-3 py-3 border-2 border-slate-400 rounded-2xl'>
      <div className='flex justify-center items-center gap-2 text-slate-100'>
        {/* <div className='p-2 bg-black/10 rounded-lg border-2 border-slate-400 hover:scale-110 duration-300 cursor-pointer'><FileText/></div> */}
        {/* <div className='p-2 bg-black/10 rounded-lg border-2 border-slate-400 hover:scale-110 duration-300 cursor-pointer'><HelpCircle/></div> */}
        <div onClick={handleShare} className='p-2 bg-[#0f172b] rounded-lg border-2 border-blue-700 hover:scale-110 duration-300 cursor-pointer'><Share2/></div>
        <div onClick={copyLinkHandler} className='p-2 bg-[#0f172b] rounded-lg border-2 border-blue-700 hover:scale-110 duration-300 cursor-pointer'><CopyIcon/></div>
        <div onClick={bookmarkHandler} className='p-2 bg-[#0f172b] rounded-lg border-2 border-blue-700 hover:scale-110 duration-300 cursor-pointer'><BookMarkedIcon/></div>
        <div onClick={downloadPdfHandler} className='p-2 bg-[#0f172b] rounded-lg border-2 border-blue-700 hover:scale-110 duration-300 cursor-pointer'><DownloadIcon/></div>
        <div className='p-2 bg-[#0f172b] rounded-lg border-2 border-blue-700 hover:scale-110 duration-300 cursor-pointer'><LucideMail/></div>
        <div className='p-2 bg-[#0f172b] rounded-lg border-2 border-blue-700 hover:scale-110 duration-300 cursor-pointer'><MessageSquare/></div>
      </div>
    </div>
  )
}

export default FeatureBar
