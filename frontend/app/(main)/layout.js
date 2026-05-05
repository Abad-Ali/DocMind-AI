import LeftSideBar from "@/components/LeftSideBar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="flex justify-center lg:justify-start">
        <LeftSideBar />
      </div>

        <div className="relative z-10">
          {children}
        </div>

        <Footer />
    </div>
  );
}