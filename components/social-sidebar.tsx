"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiInstagram,
  SiX,
  SiLinkedin,
  SiGmail,
  SiGithub,
  SiWhatsapp,
} from "react-icons/si";
// 1. GANTI BARIS INI: Import User dari lucide-react
import { ExternalLink, User, X as CloseIcon } from "lucide-react";

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    // ... (array socialLinks tidak berubah, tetap sama)
    {
      Icon: SiInstagram,
      href: "https://instagram.com/alvnfrs_/profilecard/?igsh=MTltYzM4cnlpdmQzbA",
      label: "Instagram",
      hoverBgClass: "hover:bg-pink-500/20",
      iconColor: "#E1306C",
    },
    {
      Icon: SiX,
      href: "https://X.com/Alvnfrs_?s=08",
      label: "X (Twitter)",
      hoverBgClass: "hover:bg-gray-400/20",
      iconColor: "#FFFFFF",
    },
    {
      Icon: SiLinkedin,
      href: "https://www.linkedin.com/in/alvin-faris-89060a31b/",
      label: "LinkedIn",
      hoverBgClass: "hover:bg-blue-600/20",
      iconColor: "#0A66C2",
    },
    {
      Icon: SiGmail,
      href: "mailto:alvinfaris59@gmail.com",
      label: "Gmail",
      hoverBgClass: "hover:bg-red-500/20",
      iconColor: "#EA4335",
    },
    {
      Icon: SiGithub,
      href: "https://github.com/ALVINfrs",
      label: "GitHub",
      hoverBgClass: "hover:bg-gray-500/20",
      iconColor: "#FFFFFF",
    },
    {
      Icon: SiWhatsapp,
      href: "https://wa.me/628979945242",
      label: "WhatsApp",
      hoverBgClass: "hover:bg-green-500/20",
      iconColor: "#25D366",
    },
  ];

  const sidebarVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const iconVariants = {
    open: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
    closed: { y: 20, opacity: 0 },
  };

  return (
    <aside className="fixed right-2 top-1/2 -translate-y-1/2 z-40 sm:right-4 max-sm:top-auto max-sm:bottom-4 max-sm:translate-y-0">
      <div className="relative flex flex-col items-end gap-2">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700/70 text-slate-200 shadow-xl z-10"
          whileHover={{ scale: 1.1, backgroundColor: "#1e293b" }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "user"} // Ganti key agar animasi berjalan
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {/* 2. GANTI BARIS INI: Gunakan ikon User */}
              {isOpen ? <CloseIcon size={22} /> : <User size={22} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-700/70 p-2 shadow-xl sm:gap-2.5 sm:p-2.5"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  variants={iconVariants}
                  className={`p-2 rounded-md bg-slate-800/60 transition-colors duration-200 ${link.hoverBgClass} group relative flex items-center justify-center sm:p-2.5 active:scale-95`}
                >
                  <link.Icon
                    size={18}
                    className="sm:w-5 sm:h-5"
                    style={{ color: link.iconColor || "currentColor" }}
                  />
                  <span className="absolute right-full mr-3.5 top-1/2 transform -translate-y-1/2 bg-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-slate-700 pointer-events-none hidden sm:block">
                    {link.label}
                    <ExternalLink
                      size={12}
                      className="inline ml-1.5 opacity-70"
                    />
                  </span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
