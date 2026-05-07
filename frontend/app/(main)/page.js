'use client'
import CarouselFeatures from '@/components/CarouselFeatures';
import DevelopedBy from '@/components/DevelopedBy';
import useGetRecentPdfs from '@/hooks/useGetRecentPdfs';
import { ArrowRight, GlobeIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Typewriter from 'typewriter-effect';

export default function Home() {
  useGetRecentPdfs();
  const router = useRouter();
  return (
    <div className='w-full h-full lg:pt-[20vh] pt-[15vh] sm:pt-[14vh] lg:pl-64 [@media(min-width:1023px)_and_(max-width:1350px)]:pt-[10vh]'>
        <div className="text-white flex justify-center items-center">
          <div className="flex flex-col lg:flex-row [@media(min-width:1023px)_and_(max-width:1350px)]:flex-col justify-center items-center gap-9">
            <div className="flex flex-col items-center lg:min-w-lg gap-3">
              <div className='flex justify-start lg:w-full lg:ml-2'><span className="text-4xl font-bold font-serif text-start">Welcome to </span></div>
              <div className='flex justify-start lg:w-full lg:ml-36'><span className="text-4xl font-bold font-serif text-blue-700"><Typewriter
                options={{
                  strings: ['DocMind AI'],
                  autoStart: true,
                  loop: true,
                  pauseFor: 700,
                  typeSpeed: 0,
                  cursor: ''
                }}
              /></span></div>
    
              <span className='text-slate-200 lg:w-xl text-center mb-2 italic px-3 lg-px-0'>Supercharge your learning with DcoMind AI. Summarize texts, generate questions & answers, and chat directly with PDFs — all powered by AI. Get your notes and Q&A sent straight to your inbox and study smarter,      faster, and easier than ever.</span>
    
              <button onClick={()=>router.push('/explore')} className="bg-blue-700 px-4 py-2.5 rounded-2xl font-semibold cursor-pointer flex gap-1 items-center hover:bg-blue-800 duration-300"><GlobeIcon/> Explore Now For Free <ArrowRight/></button>
            </div>
            <div className="">
              <Image src='/mainimg.svg' alt='main_img' height={400} width={400}/>
            </div>
          </div>
        </div>
      <div className='flex justify-center items-center'><CarouselFeatures/></div>
      <div className='flex justify-center items-center'><DevelopedBy/></div>
    </div>
  );
}
