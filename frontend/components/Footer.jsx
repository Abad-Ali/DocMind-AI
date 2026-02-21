import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black text-slate-300 border-t-2 border-slate-500 pl-64'>
        <div className='flex flex-col justify-center items-center p-7'>
            <div className='flex flex-wrap justify-center items-center gap-4 mb-2 text-sm cursor-pointer'>
                <p>Terms & Conditions</p>
                <p>Privacy</p>
                <p>Disclaimer</p>
                <p>Security</p>
            </div>

            <div className='flex flex-col items-center'>
                <span className='font-medium'>&copy; {new Date().getFullYear()} DocMind AI</span>
                <p className='text-sm text-slate-400'>Learn with Artificial Intelligence</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
