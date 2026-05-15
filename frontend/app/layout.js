import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from './provider';  // Client Component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocMind AI",
  description: "Supercharge your learning with DcoMind AI. Summarize texts, generate questions & answers, and chat directly with PDFs — all powered by AI. Get your notes and Q&A sent straight to your inbox and study smarter,faster, and easier than ever.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <div className="min-h-screen w-full relative bg-black text-white">
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
              }}
            />
          
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
          <Toaster/>
        </ReduxProvider>
      </body>
    </html>
  );
}
