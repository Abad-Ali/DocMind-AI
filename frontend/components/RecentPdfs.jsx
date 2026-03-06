import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const RecentPdfs = () => {
  const { recentPDF } = useSelector(store => store.recPDF);
  const router = useRouter();

  return (
    <div className="text-white flex flex-col gap-7">
        <div className="flex justify-center">
            <span className="text-4xl font-bold font-serif">Recently Uploaded PDFs</span>
        </div>

        <div className="flex justify-center items-center mt-4 mb-7">
        <div className="grid grid-cols-4 gap-3">
            {recentPDF.map(pdf => (
                <div key={pdf.id} onClick={()=>router.push(`pdf/${pdf.id}`)}>
                    <div className="relative w-[245] h-[300] rounded-2xl overflow-hidden">
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
    
                                <div>
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
                    </div>
                </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default RecentPdfs;
