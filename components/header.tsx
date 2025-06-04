"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certificates", href: "#certificates" },
    { name: "Games", href: "#games" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-green-500/30" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <Terminal className="text-green-400 h-6 w-6" />
          <span className="text-xl font-bold tracking-tighter glitch-text">
            <span className="text-green-400">Alvn</span>
            <span className="text-purple-400">frss</span>
          </span>
        </motion.div>

        <nav>
          <ul className="hidden md:flex gap-6">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href} className="text-green-300 hover:text-green-100 relative group">
                  <span>{`> ${item.name}`}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.button className="md:hidden text-green-400" whileTap={{ scale: 0.9 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </motion.button>
        </nav>
      </div>
    </motion.header>
  )
}
