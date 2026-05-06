'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from './ui/button';
import Link from 'next/link';
import { FileText, MessageSquare, Download, Mail, Shield, Sparkles, Upload, HelpCircle } from 'lucide-react';

const features = [
  {
    feature: "Summarize PDF",
    featureDesc: "Generate clear and concise summaries instantly using AI.",
    icon: <FileText className="w-8 h-8" />
  },
  {
    feature: "Generate Questions & Answers",
    featureDesc: "Create smart questions with detailed answers automatically.",
    icon: <HelpCircle className="w-8 h-8" />
  },
  {
    feature: "Chat with PDF",
    featureDesc: "Ask anything and get accurate answers directly from your PDF.",
    icon: <MessageSquare className="w-8 h-8" />
  },
  {
    feature: "Download, Share & View",
    featureDesc: "Securely view, download and share your PDFs easily.",
    icon: <Download className="w-8 h-8" />
  },
  {
    feature: "Email Summary & Q&A",
    featureDesc: "Send summaries and Q&A directly to your email in one click.",
    icon: <Mail className="w-8 h-8" />
  },
  {
    feature: "Admin Upload",
    featureDesc: "Admins can upload and manage PDFs efficiently.",
    icon: <Upload className="w-8 h-8" />
  },
  {
    feature: "AI Title & Description",
    featureDesc: "Enhance titles and descriptions automatically with AI.",
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    feature: "Secure Authentication",
    featureDesc: "Only logged-in users can access the platform securely.",
    icon: <Shield className="w-8 h-8" />
  }
];

const CarouselFeatures = () => {
  return (
    <div className='mt-10 flex flex-col items-center'>
        <div className="text-center mb-5">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Powerful PDF Tools at Your Fingertips
          </h2>
          <p className="text-[15px] lg:text-[17px] text-slate-400 mt-2">
            Effortlessly summarize, analyze, and manage PDFs with AI.
          </p>
        </div>
        <div className="w-[70vw] h-full lg:py-5">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={4}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              1280: { slidesPerView: 4 },
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              0: { slidesPerView: 1 }
            }}
            className="pb-12 flex justify-center px-2"
          >
            {features.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group min-h-[250px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer text-white flex flex-col justify-evenly my-7">
                  
                  <div className="mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {item.feature}
                  </h3>

                  <p className="text-sm text-slate-500 mb-4">
                    {item.featureDesc}
                  </p>

                  <Link href="/explore">
                    <Button size="sm" className="w-full mt-auto cursor-pointer">
                      Explore
                    </Button>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </div>
  );
};

export default CarouselFeatures;