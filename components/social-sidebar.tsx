"use client";

import { motion } from "framer-motion";
// Import ikon dari react-icons (Simple Icons set untuk brand)
import {
  SiInstagram,
  SiX, // Menggantikan Twitter
  SiLinkedin,
  SiGmail, // Menggantikan Mail generik
  SiGithub,
  SiWhatsapp,
} from "react-icons/si";
import { ExternalLink } from "lucide-react"; // ExternalLink bisa tetap dari lucide

export default function SocialSidebar() {
  const socialLinks = [
    {
      Icon: SiInstagram,
      href: "https://instagram.com/alvnfrs_/profilecard/?igsh=MTltYzM4cnlpdmQzbA",
      label: "Instagram",
      hoverBgClass: "hover:bg-pink-500/20", // Background hover
      iconColor: "#E1306C", // Warna ikon Instagram (bisa juga tidak diset jika SiInstagram sudah berwarna)
    },
    {
      Icon: SiX,
      href: "https://X.com/Alvnfrs_?s=08",
      label: "X (Twitter)",
      hoverBgClass: "hover:bg-gray-400/20",
      iconColor: "#FFFFFF", // Atau #000000 tergantung tema X Anda
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
      iconColor: "#FFFFFF", // Atau #181717
    },
    {
      Icon: SiWhatsapp, // Menggantikan MessageCircle generik
      href: "https://wa.me/628979945242",
      label: "WhatsApp",
      hoverBgClass: "hover:bg-green-500/20",
      iconColor: "#25D366",
    },
  ];

  return (
    <motion.aside
      // Fixed positioning yang lebih konsisten:
      // - Desktop: di kanan, benar-benar di tengah vertikal
      // - Mobile: di kanan bawah agar tidak menghalangi konten
      className="fixed right-2 top-1/4 -translate-y-1/4 z-40 
                 sm:right-4 
                 max-sm:top-auto max-sm:bottom-4 max-sm:translate-y-0"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }} // Sedikit delay agar tidak bersamaan dengan elemen lain
    >
      <div
        className="flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-700/70 p-2 shadow-xl
                      sm:gap-2.5 sm:p-2.5
                      max-sm:bg-slate-900/95"
      >
        {socialLinks.map((link, index) => {
          const CurrentIcon = link.Icon; // Ambil komponen ikon
          return (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.label} // Menambah title untuk aksesibilitas
              className={`p-2 rounded-md bg-slate-800/60 transition-all duration-200 ${link.hoverBgClass} group relative flex items-center justify-center
                         sm:p-2.5
                         active:scale-95`} // Tambah active state untuk mobile
              whileHover={{
                scale: 1.15,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.15 * index + 1.2,
                type: "spring",
                stiffness: 120,
              }} // Delay disesuaikan dengan parent
            >
              {/* Render ikon dengan ukuran responsif */}
              <CurrentIcon
                size={18} // Sedikit lebih kecil untuk mobile
                className="sm:w-5 sm:h-5"
                style={{ color: link.iconColor || "currentColor" }}
              />

              {/* Tooltip yang hanya muncul di desktop */}
              <span
                className="absolute right-full mr-3.5 top-1/2 transform -translate-y-1/2
                           bg-slate-800 text-slate-200 text-xs
                           px-3 py-1.5 rounded-md shadow-lg
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           whitespace-nowrap border border-slate-700 pointer-events-none
                           hidden sm:block"
              >
                {link.label}
                <ExternalLink size={12} className="inline ml-1.5 opacity-70" />
              </span>
            </motion.a>
          );
        })}
      </div>
    </motion.aside>
  );
}
