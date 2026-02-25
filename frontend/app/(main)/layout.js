import LeftSideBar from "@/components/LeftSideBar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full">
      <LeftSideBar />

        <div className="relative z-10">
          {children}
        </div>

        <Footer />
    </div>
  );
}