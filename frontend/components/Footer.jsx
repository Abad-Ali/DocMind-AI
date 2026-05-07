import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

const LegalDialog = ({ title, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer hover:text-white">{title}</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[70vh] overflow-y-auto bg-black/10 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-300">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-2 text-sm text-slate-400 space-y-4">{children}</div>
        <DialogClose className="mt-4 px-4 py-2 bg-black rounded-lg text-white hover:bg-gray-950 font-semibold font-sans cursor-pointer">
          Close
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-slate-300 border-t-2 border-slate-500 lg:pl-64">
      <div className="flex flex-col justify-center items-center p-7">
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-2 text-sm">
          
          <LegalDialog title="Terms & Conditions">
            <p>Welcome to DocMind AI. By using this platform, you agree to comply with the following terms:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Upload only content that you own or that is copyright-free.</li>
              <li>Do not submit content that infringes on third-party rights.</li>
              <li>All uploaded content may be used to improve AI models under the Gemini free key program.</li>
              <li>DocMind AI reserves the right to remove content that violates these terms.</li>
            </ul>
            <p className="font-medium mt-2">By continuing, you acknowledge that you have read and agreed to these terms.</p>
          </LegalDialog>

          <LegalDialog title="Privacy">
            <p>DocMind AI is committed to protecting your privacy. Key points include:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>We collect only minimal personal data necessary for authentication and account management.</li>
              <li>Cookies are used to identify users and maintain session integrity.</li>
              <li>Email verification is required before accessing the platform.</li>
              <li>We do not share your data with third parties without your consent.</li>
            </ul>
            <p className="font-medium mt-2">Your privacy and security are our top priorities.</p>
          </LegalDialog>

          <LegalDialog title="Disclaimer">
            <p>DocMind AI is designed for educational and research purposes. Users should be aware that:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>We do not guarantee the accuracy, reliability, or legality of uploaded content.</li>
              <li>Users are responsible for ensuring compliance with copyright and intellectual property laws.</li>
              <li>The platform is provided “as-is” and may have limitations.</li>
            </ul>
            <p className="font-medium mt-2">By using the platform, you accept these limitations and responsibilities.</p>
          </LegalDialog>

          <LegalDialog title="Security">
            <p>Security is a priority at DocMind AI. Measures include:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Only authenticated users can access the application.</li>
              <li>Cookies and email verification ensure secure user identification.</li>
              <li>Sharing accounts or credentials is strictly prohibited.</li>
              <li>Users should ensure their devices are secure to prevent unauthorized access.</li>
            </ul>
            <p className="font-medium mt-2">Following these practices helps protect both your data and the integrity of the platform.</p>
          </LegalDialog>

        </div>

        <div className="flex flex-col items-center text-center">
          <span className="font-medium">&copy; {new Date().getFullYear()} DocMind AI</span>
          <p className="text-sm text-slate-400">Learn with Artificial Intelligence</p>
          <p className="text-sm text-slate-400">Built by a student for learning and research purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;