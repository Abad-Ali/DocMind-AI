import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from './provider';  // Client Component
import ProtectedAuth from "@/components/ProtectedAuth";

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
          <ProtectedAuth>
          <div className="min-h-screen w-full relative bg-black text-white">
            {/* Background gradient */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(
                    90deg, 
                    transparent 0%,
                    transparent 30%,
                    rgba(138, 43, 226, 0.4) 50%,
                    transparent 70%,
                    transparent 100%
                  ),
                  linear-gradient(
                    to bottom,
                    #1a1a2e 0%,
                    #2d1b69 50%,
                    #0f0f23 100%
                  )
                `,
                backgroundImage: `
                  repeating-linear-gradient(
                    90deg,
                    transparent 0px,
                    transparent 79px,
                    rgba(255, 255, 255, 0.05) 80px,
                    rgba(255, 255, 255, 0.05) 81px
                  )
                `,
              }}
            />
          
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
          <Toaster/>
          </ProtectedAuth>
        </ReduxProvider>
      </body>
    </html>
  );
}
<div className="min-h-screen w-full bg-black relative overflow-hidden">
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: `
        linear-gradient(
          90deg, 
          transparent 0%,
          transparent 30%,
          rgba(138, 43, 226, 0.4) 50%,
          transparent 70%,
          transparent 100%
        ),
        linear-gradient(
          to bottom,
          #1a1a2e 0%,
          #2d1b69 50%,
          #0f0f23 100%
        )
      `,
      backgroundImage: `
        repeating-linear-gradient(
          90deg,
          transparent 0px,
          transparent 79px,
          rgba(255, 255, 255, 0.05) 80px,
          rgba(255, 255, 255, 0.05) 81px
        )
      `,
    }}
  />
  {/* Your Content Here */}
</div>