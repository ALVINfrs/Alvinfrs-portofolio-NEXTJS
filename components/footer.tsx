"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative py-12 border-t border-green-500/30">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <motion.p
            className="text-gray-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            &copy; {new Date().getFullYear()} Muhammad Alvin Faris. All rights reserved.
          </motion.p>

          <motion.p
            className="text-gray-500 text-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built with passion and dedication using React, Next.js, and Framer Motion
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="p-3 bg-green-600 hover:bg-green-700 rounded-full text-white transition-colors group"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ArrowUp size={20} className="group-hover:animate-bounce" />
          </motion.button>
        </div>
      </div>

      {/* Matrix rain effect for footer */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="matrix-rain"></div>
      </div>
    </footer>
  )
}
