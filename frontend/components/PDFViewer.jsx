"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // optional shadcn/ui
import { Slider } from "@/components/ui/slider";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PDFViewer({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="space-y-4 p-5 rounded-xs shadow h-[99vh] w-xl bg-white/10 text-white">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button className='cursor-pointer' onClick={() => setPageNumber(p => Math.max(p - 1, 1))}>
            Prev
          </Button>
          <Button className='cursor-pointer' onClick={() => setPageNumber(p => Math.min(p + 1, numPages))}>
            Next
          </Button>
        </div>
    
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{pageNumber} / {numPages}</span>
          <input
            type="range"
            min={0.9}
            max={2}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-40 cursor-pointer"
          />
          <span className="text-sm">{Math.round(zoom * 100)}%</span>
        </div>
      </div>
    
      <div className="border rounded overflow-auto h-[87vh] flex justify-center items-center bg-white/10">
        <Document file={url} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          <Page
            pageNumber={pageNumber}
            scale={zoom}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            height={590}
          />
        </Document>
      </div>
    </div>

  );
}
