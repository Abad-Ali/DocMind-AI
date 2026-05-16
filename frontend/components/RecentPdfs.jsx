import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { FileX2Icon } from "lucide-react";

const RecentPdfs = () => {
  const { recentPDF } = useSelector(store => store.recPDF);
  const router = useRouter();

  return (
    <div className="text-white flex flex-col gap-7">
        <motion.div initial={{ opacity: 0, y: 40 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="flex justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-center px-2">Recently Uploaded PDFs</span>
        </motion.div>

        <div className="flex justify-center items-center mt-4 mb-7">
        {
            recentPDF.length > 0 ? (
                <div className="grid [@media(min-width:0px)_and_(max-width:415px)]:grid-cols-1 grid-cols-2 sm:grid-cols-3 [@media(min-width:1023px)_and_(max-width:1350px)]:grid-cols-3 lg:grid-cols-4 gap-3">
                    {recentPDF.map(pdf => (
                        <div key={pdf.id} onClick={()=>router.push(`pdf/${pdf.id}`)}>
                            <motion.div initial={{ opacity: 0, y: 80 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="relative [@media(min-width:0px)_and_(max-width:415px)]:w-[270] w-[207] lg:w-[245] h-[310] lg:h-[300] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 duration-300">
                                <img
                                  src={pdf.previewUrl}
                                  className="rounded-2xl w-full h-full"
                                />
                                <motion.div initial={{ opacity: 0, y: 70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 2, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute bottom-0 bg-black/20 backdrop-blur-lg min-w-full min-h-[200] rounded-2xl text-black">
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
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="h-[30vh] flex justify-center items-center">
                    <div className="text-[17px] text-slate-500 font-semibold flex flex-col items-center gap-3">
                        <div className="p-3 border-[3.5px] border-slate-500 rounded-full"><FileX2Icon strokeWidth={2} size={40} /></div>
                        <span>No Recently Uploaded PDFs To Show</span>
                    </div>
                </div>
            )
        }
        </div>
    </div>
  );
};

export default RecentPdfs;
