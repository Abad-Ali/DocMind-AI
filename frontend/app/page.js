'use client'
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <div className="h-screen w-screen text-white flex justify-center items-center pt-16">
      <div className="flex justify-center items-center gap-9">
        <div className="flex flex-col items-center min-w-lg gap-3">
          <div className='flex justify-start w-full ml-2'><span className="text-4xl font-bold font-serif text-start">Welcome to </span></div>
          <div className='flex justify-start w-full ml-36'><span className="text-4xl font-bold font-serif text-blue-700"><Typewriter
            options={{
              strings: ['DocMind AI'],
              autoStart: true,
              loop: true,
              pauseFor: 700,
              typeSpeed: 0,
              cursor: ''
            }}
          /></span></div>

          <span className='text-slate-200 w-xl text-center mb-2 italic'>Supercharge your learning with DcoMind AI. Summarize texts, generate questions & answers, and chat directly with PDFs — all powered by AI. Get your notes and Q&A sent straight to your inbox and study smarter, faster, and easier than ever.</span>

          <button className="bg-blue-700 px-4 py-2 rounded-2xl font-semibold cursor-pointer flex gap-1 items-center">Explore Now For Free <ArrowRight/></button>
        </div>
        <div className="">
          <Image src='/mainimg.svg' alt='main_img' height={400} width={400}/>
        </div>
      </div>
    </div>
  );
}
