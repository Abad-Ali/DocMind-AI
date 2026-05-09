'use client'
import LeftSideBar from "@/components/LeftSideBar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const isSpecialPage = pathname.endsWith("/chat");
  
  return (
    <div className="relative min-h-screen w-full">
      <div className={`flex justify-center lg:justify-start ${isSpecialPage ? ('hidden lg:flex'):('')}`}>
        <LeftSideBar />
      </div>

      <div className="relative z-10">
        {children}
      </div>
      
      <div className={`${isSpecialPage ? ('hidden lg:flex'):('')}`}>
        <Footer />
      </div>
    </div>
  );
}