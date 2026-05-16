'use client'
import Link from "next/link"
import React from "react"
import { motion } from "framer-motion"

const NotFound = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="
          absolute top-1/2 left-1/2
          min-h-full min-w-full
          -translate-x-1/2 -translate-y-1/2
          object-cover
          md:object-cover
        "
      >
        <source src="/NotFound.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-20">

        <div className="max-w-xl text-white">
          <motion.h1 initial={{ opacity: 0, x: -70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="font-mono font-black leading-none text-[14vh] sm:text-[18vh] md:text-[22vh]">
            404
          </motion.h1>

          <motion.h2 initial={{ opacity: 0, x: -70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.3, ease: "easeInOut" }} className="font-bold tracking-wide text-xl sm:text-2xl md:text-4xl text-transparent [-webkit-text-stroke:2px_white]">
            PAGE NOT FOUND
          </motion.h2>

          <motion.p initial={{ opacity: 0, x: -70 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="mt-3 text-gray-300 text-sm sm:text-base md:text-xl">
            Your search has drifted beyond the known universe.
          </motion.p>
        </div>

        {/* Right Side Doodle Text */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeInOut" }} className="hidden md:block absolute right-6 md:right-20 top-1/2 -translate-y-1/2 text-right max-w-xs text-white/20 select-none">
          <p className="text-sm md:text-base leading-relaxed">
            lost signals…<br />
            floating pixels…<br />
            somewhere between reality & render…<br />
            <br />
            “you are not here”
          </p>

          <div className="mt-6 text-xs tracking-[0.3em] uppercase text-white/10">
            system: unknown
          </div>
        </motion.div>

        {/* Bottom Right Button */}
        <motion.div initial={{ opacity: 0, y: 50 }} viewport={{ once: true, amount: 0.5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute bottom-[30vh] md:bottom-[25vh] right-10 md:right-20 z-20">
          <Link href="/" className="inline-block rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm md:text-base font-semibold text-white backdrop-blur-lg duration-300 hover:bg-white/70 hover:text-black hover:scale-105 hover:border-blue-700">
            Bring Me Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound