"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"; // useDragControls removed as not explicitly used in current drag setup
import Image from "next/image";
import { QrCode, Shield } from "lucide-react";

export default function IdCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const y = useMotionValue(0);
  const x = useMotionValue(0);

  // Mengurangi stiffness agar tidak terlalu "mental" saat dilepas
  const ySpring = useSpring(y, { stiffness: 200, damping: 25 });
  const xSpring = useSpring(x, { stiffness: 200, damping: 25 });

  const initialCardTop = 160; // Disesuaikan dengan lanyardClipTop + initialLanyardRopeHeight
  const lanyardClipTop = 60; // Menurunkan posisi clip lanyard

  const lanyardRopeInitialHeight = 100;
  const lanyardHeight = useTransform(
    ySpring,
    [0, 150],
    [lanyardRopeInitialHeight, lanyardRopeInitialHeight + 150]
  ); // Panjang tali bertambah saat ditarik
  const lanyardOpacity = useTransform(ySpring, [0, 100], [0.9, 1]); // Opacity sedikit berubah

  // Card rotation with limits
  const rotateX = useTransform(ySpring, [-50, 150], [-10, 10]); // Adjusted range for more natural rotation
  const rotateY = useTransform(xSpring, [-100, 100], [-15, 15]); // Adjusted range

  const handleDragEnd = () => {
    y.set(0);
    x.set(0);
  };

  return (
    // Pastikan section ini memiliki cukup ruang di atasnya pada layout halaman utama Anda
    <section className="relative h-[600px] flex justify-center items-center my-16 overflow-hidden">
      <div ref={constraintsRef} className="h-full w-full absolute">
        {/* Lanyard System */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 z-10"
          style={{ top: `${lanyardClipTop}px` }}
        >
          {/* Lanyard Clip (Bagian atas gantungan) */}
          <motion.div className="w-7 h-5 bg-gradient-to-b from-zinc-400 to-zinc-500 rounded-sm border border-zinc-600 shadow-md relative">
            {/* Detail pada clip */}
            <div className="absolute w-4 h-1 bg-zinc-300 top-[3px] left-1/2 -translate-x-1/2 rounded-sm"></div>
          </motion.div>

          {/* Lanyard Rope (Tali) */}
          <motion.div
            className="bg-gradient-to-b from-gray-600 to-gray-700 origin-top shadow-lg relative"
            style={{
              height: lanyardHeight,
              opacity: lanyardOpacity,
              width: "10px", // Lebar tali dibuat tetap dan lebih tebal
              borderRadius: "0 0 3px 3px", // Rounded di bawah
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* Lanyard Connector (Penghubung tali ke kartu) */}
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-3 bg-zinc-500 rounded-b-sm border-x border-b border-zinc-600"></div>
          </motion.div>
        </div>

        {/* ID Card */}
        <motion.div
          drag
          dragConstraints={{ left: -120, right: 120, top: 0, bottom: 150 }}
          dragElastic={0.05} // Mengurangi elastisitas agar tidak terlalu membal
          onDragEnd={handleDragEnd}
          style={{
            y: ySpring,
            x: xSpring,
            rotateX,
            rotateY,
            top: `${initialCardTop}px`, // Posisi awal kartu disesuaikan
          }}
          className="absolute left-1/2 transform -translate-x-1/2 cursor-grab active:cursor-grabbing z-20"
          whileTap={{ scale: 1.03, cursor: "grabbing" }} // Sedikit membesar saat di-tap
        >
          <motion.div
            className="w-64 h-96 rounded-xl perspective-1000 relative shadow-2xl" // Tambah shadow di sini juga
            onClick={() => setIsFlipped(!isFlipped)}
            whileHover={{ scale: 1.02 }} // Efek hover tetap
          >
            <motion.div
              className="w-full h-full relative preserve-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
            >
              {/* Card Slot (Visual lubang gantungan di kartu) */}
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-10 h-[5px] bg-gray-700 rounded-[2px] z-30 border border-gray-600"></div>

              {/* Front Card */}
              <motion.div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-gray-800 via-gray-800 to-black rounded-xl border border-green-500/40 shadow-xl shadow-green-500/10 p-5 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="text-center pt-5 mb-3 pb-3 border-b border-green-500/20">
                  {" "}
                  {/* Tambah pt-5 karena ada slot */}
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Shield className="text-green-400" size={16} />
                    <span className="text-green-400 text-xs font-bold tracking-wider">
                      DEV ACCESS
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs">
                    FULLSTACK DEVELOPER
                  </div>
                </div>

                {/* Profile */}
                <div className="flex flex-col items-center mb-3">
                  <div className="relative w-[70px] h-[70px] mb-2 rounded-full overflow-hidden border-2 border-green-500/70">
                    <Image
                      src="/images/profile/profile.jpg" // Sesuaikan jika path placeholder Anda berbeda
                      alt="Muhammad Alvin Faris"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h2 className="text-white text-md font-bold text-center">
                    Muhammad Alvin Faris
                  </h2>
                  <p className="text-green-400 text-xs">Full Stack Developer</p>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex justify-between bg-gray-700/40 rounded p-1.5 px-2">
                    <span className="text-green-400">ID:</span>
                    <span className="text-white font-mono">DEV-2024-AF</span>
                  </div>
                  <div className="flex justify-between bg-gray-700/40 rounded p-1.5 px-2">
                    <span className="text-green-400">LEVEL:</span>
                    <span className="text-white">Junior Dev</span>
                  </div>
                  <div className="flex justify-between bg-gray-700/40 rounded p-1.5 px-2">
                    <span className="text-green-400">STACK:</span>
                    <span className="text-white">MERN</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end mt-3">
                  <div className="text-xs text-gray-500">
                    <p>Click to flip</p>
                  </div>
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                    <QrCode className="w-7 h-7 text-black" />
                  </div>
                </div>
              </motion.div>

              {/* Back Card */}
              <motion.div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-gray-800 via-gray-800 to-black rounded-xl border border-green-500/40 shadow-xl shadow-green-500/10 p-5 flex flex-col rotateY-180 overflow-hidden">
                {/* Card Slot juga perlu di belakang jika ingin konsisten */}
                {/* <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-10 h-[5px] bg-gray-700 rounded-[2px] z-0 border border-gray-600"></div> */}
                <div className="text-center pt-5 mb-3 pb-3 border-b border-green-500/20">
                  {" "}
                  {/* Tambah pt-5 */}
                  <span className="text-green-400 text-xs font-bold tracking-wider">
                    CONTACT INFO
                  </span>
                </div>

                <div className="flex-1 space-y-2 text-sm">
                  <div className="bg-gray-700/40 rounded p-2.5">
                    <div className="text-green-400 text-[10px] mb-0.5 uppercase">
                      EMAIL
                    </div>
                    <div className="text-white text-[11px] break-all">
                      alvinfaris59@gmail.com
                    </div>
                  </div>
                  <div className="bg-gray-700/40 rounded p-2.5">
                    <div className="text-green-400 text-[10px] mb-0.5 uppercase">
                      PHONE
                    </div>
                    <div className="text-white text-[11px]">
                      +62 813 9813 9519
                    </div>
                  </div>
                  <div className="bg-gray-700/40 rounded p-2.5">
                    <div className="text-green-400 text-[10px] mb-0.5 uppercase">
                      GITHUB
                    </div>
                    <div className="text-white text-[11px] break-all">
                      github.com/ALVINfrs
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-500 mt-3">
                  <p>✓ Authorized Developer</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
