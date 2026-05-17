// "use client";

// import { Document, Page, pdfjs } from "react-pdf";
// import { useState } from "react";
// import { Button } from "@/components/ui/button"; // optional shadcn/ui
// import { Slider } from "@/components/ui/slider";
// import { Sparkles } from "lucide-react";
// import FeatureBar from "./FeatureBar";

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// export default function PDFViewer({ url, pdfId }) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [zoom, setZoom] = useState(1);
//   const [show, setShow] = useState(false);

//   return (
//     <div className="space-y-4 p-5 shadow h-[99vh] w-[85vw] sm:w-[70vw] lg:w-xl bg-white/10 text-white mt-20 mb-7 lg:mt-0 lg:mb-0 rounded-3xl lg:rounded-lg">
//       <div className="flex items-center justify-between">
//         <div className="flex gap-2">
//           <Button className='cursor-pointer' onClick={() => setPageNumber(p => Math.max(p - 1, 1))}>
//             Prev
//           </Button>
//           <Button className='cursor-pointer' onClick={() => setPageNumber(p => Math.min(p + 1, numPages))}>
//             Next
//           </Button>

//           <Button className='cursor-pointer' onClick={()=>setShow(!show)}><Sparkles/> Feature Bar</Button>
//         </div>
    
//         <div className="hidden sm:flex items-center gap-2">
//           <span className="text-sm font-medium">{pageNumber} / {numPages}</span>
//           <input
//             type="range"
//             min={0.9}
//             max={2}
//             step={0.1}
//             value={zoom}
//             onChange={(e) => setZoom(parseFloat(e.target.value))}
//             className="sm:w-20 lg:w-40 cursor-pointer"
//           />
//           <span className="text-sm">{Math.round(zoom * 100)}%</span>
//         </div>
//       </div>
    
//       <div className="relative border rounded overflow-auto h-[87vh] flex justify-center items-center bg-white/10 rounded-xl">
//         <Document file={url} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
//           <Page
//             pageNumber={pageNumber}
//             scale={zoom}
//             renderTextLayer={false}
//             renderAnnotationLayer={false}
//             height={590}
//           />
         
//          <div className="flex justify-center"><FeatureBar show={show} pdfId={pdfId}/></div>
//         </Document>
//       </div>
//     </div>

//   );
// }

"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import FeatureBar from "./FeatureBar";
import { motion } from "framer-motion";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PDFViewer({ url, pdfId }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [show, setShow] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);

  const containerRef = useRef(null);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="space-y-4 px-5 pt-5 shadow h-fit lg:h-[99vh] w-[85vw] sm:w-[70vw] lg:w-xl bg-white/10 text-white sm:mt-20 lg:mt-0  rounded-3xl lg:rounded-lg scrollable">
      
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
          >
            Prev
          </Button>

          <Button
            onClick={() =>
              setPageNumber((p) => Math.min(p + 1, numPages))
            }
          >
            Next
          </Button>

          <Button className={`${show === true ? ('bg-slate-50 text-slate-950 hover:bg-slate-100'):('')} cursor-pointer`} onClick={() => setShow(!show)}>
            <Sparkles /> Feature Bar
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="pl-5 sm:pl-0">
            {pageNumber} / {numPages}
          </span>

          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="sm:w-20 lg:w-40"
          />

          <span>{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative border rounded overflow-auto h-fit lg:h-[87vh] flex justify-center bg-white/10 rounded-xl p-1"
      >
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth * 0.95 * zoom}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />

          {/* <div className="flex justify-center">
            <FeatureBar show={show} pdfId={pdfId} />
          </div> */}
        </Document>
      </div>
      <div className="flex justify-center mb-5 sm:mb-0">
        <FeatureBar show={show} pdfId={pdfId} />
      </div>
    </motion.div>
  );
}