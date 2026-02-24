// "use client"

// import { motion } from "framer-motion"
// import { Sparkles } from "lucide-react"

// export default function AIOrb() {
//   return (
//     <div className="flex items-center justify-center">
      
//       <motion.div
//         animate={{ scale: [0.6, 0.66, 0.6] }}
//         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//         className="relative w-20 h-20 rounded-full 
//         bg-black border-2 border-slate-500 
//         flex items-center justify-center shadow-lg"
//       >
//         {/* Sparkles with smooth premium color transition */}
//         <motion.div
//           animate={{
//             color: ["#f472b6", "#60a5fa", "#34d399"], 
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         >
//           <motion.div
//             initial={{ rotate: 1 }}
//             animate={{ rotate: 200 }}
//             transition={{
//               duration: 0.5,
//               ease: "easeInOut",
//             }}
//           >
//             <Sparkles className="w-7 h-7 drop-shadow-[0_0_10px_currentColor]" />
//           </motion.div>
//         </motion.div>
//       </motion.div>

//     </div>
//   )
// }

"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function AIOrb({ size = 80 }) {
  return (
    <div className="flex items-center justify-center">
      
      <motion.div
        animate={{ scale: [0.6, 0.66, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-full 
        bg-black border-2 border-slate-500 
        flex items-center justify-center shadow-lg"
        style={{
          width: size,
          height: size,
        }}
      >
        <motion.div
          animate={{
            color: ["#f472b6", "#60a5fa", "#34d399"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            initial={{ rotate: 1 }}
            animate={{ rotate: 200 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <Sparkles
              style={{ width: size * 0.35, height: size * 0.35 }}
              className="drop-shadow-[0_0_10px_currentColor]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

    </div>
  )
}