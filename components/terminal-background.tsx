"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Daftar perintah terminal (tidak diubah)
const terminalCommandsList = [
  "$ npm start",
  "$ git push origin main",
  "$ docker build -t my-app .",
  "$ yarn dev",
  "$ npm run build",
  "$ git commit -m 'fix: resolve bug'",
  "$ mongod --dbpath /data/db",
  "$ node server.js",
  "$ npm test",
  "$ git pull origin develop",
  "$ docker-compose up -d",
  "$ npm run deploy",
  "Analyzing code structure...",
  "Compiling modules...",
  "Running security scan...",
  "Deploying to production server...",
  "Fetching latest updates...",
  "Initializing virtual environment...",
  "Starting local development server...",
  "Cleaning up old build files...",
];

interface SingleTerminalProps {
  // Tambahkan props untuk rotasi agar setiap terminal bisa berbeda
  rotation: { x: number; y: number };
}

function SingleTerminal({ rotation }: SingleTerminalProps) {
  const [commands, setCommands] = useState<string[]>([]);

  useEffect(() => {
    // Logika untuk menampilkan perintah tetap sama
    const initialCommandCount = Math.floor(Math.random() * 3) + 2;
    const initialCommands = Array.from(
      { length: initialCommandCount },
      () =>
        terminalCommandsList[
          Math.floor(Math.random() * terminalCommandsList.length)
        ]
    );
    setCommands(initialCommands.slice(-8));

    const interval = setInterval(() => {
      const newCommand =
        terminalCommandsList[
          Math.floor(Math.random() * terminalCommandsList.length)
        ];
      setCommands((prev) => {
        const updated = [...prev, newCommand];
        return updated.length > 8 ? updated.slice(-8) : updated;
      });
    }, 3000 + Math.random() * 1000); // Tambahkan random delay agar tidak serentak

    return () => clearInterval(interval);
  }, []);

  // Variasi animasi untuk setiap terminal (diterima dari parent)
  const terminalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: rotation.x,
      rotateY: rotation.y,
    },
  };

  return (
    <motion.div
      variants={terminalVariants}
      // Animasi saat hover untuk interaktivitas
      whileHover={{ scale: 1.1, rotateX: 0, rotateY: 0, z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-72 h-52 bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 font-mono text-xs shadow-2xl shadow-green-500/10 overflow-hidden flex flex-col"
    >
      {/* Header Terminal */}
      <div className="flex items-center mb-2 border-b border-green-500/20 pb-1.5 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        </div>
        <span className="ml-3 text-gray-400 text-[10px]">zsh</span>
      </div>

      {/* Body Terminal */}
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-gray-800">
        <AnimatePresence initial={false}>
          {commands.map((command, index) => (
            <motion.div
              key={`${command}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-green-400 mb-1 whitespace-nowrap"
            >
              <span className="text-green-300/70 mr-1.5">
                {command.startsWith("$") ? "" : ">"}
              </span>
              {command.replace("$ ", "")}
              {index === commands.length - 1 && (
                <span className="animate-pulse inline-block ml-1 bg-green-400 w-1.5 h-3.5 align-middle"></span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Komponen utama yang mengatur layout dan animasi semua terminal
export default function ElegantTerminalBackground() {
  // Variasi animasi untuk container yang akan mengatur stagger (jeda)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Tampilkan anak-anaknya satu per satu
        staggerChildren: 0.2,
      },
    },
  };

  return (
    // Container ini menciptakan ruang 3D dan menyembunyikan terminal di layar kecil
    <motion.div
      className="fixed inset-0 z-[5] pointer-events-none hidden lg:block" // hidden lg:block -> kunci responsif
      style={{ perspective: "1000px" }} // Efek perspektif untuk 3D
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-8 left-8">
        <SingleTerminal rotation={{ x: 10, y: -15 }} />
      </div>
      <div className="absolute top-8 right-8">
        <SingleTerminal rotation={{ x: 10, y: 15 }} />
      </div>
      <div className="absolute bottom-8 left-8">
        <SingleTerminal rotation={{ x: -10, y: -15 }} />
      </div>
      <div className="absolute bottom-8 right-8">
        <SingleTerminal rotation={{ x: -10, y: 15 }} />
      </div>
    </motion.div>
  );
}
