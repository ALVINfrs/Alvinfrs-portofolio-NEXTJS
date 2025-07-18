"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { Github, Loader2, AlertTriangle, ArrowRight } from "lucide-react";

// Tipe untuk data kontribusi harian
type DayContribution = {
  date: string;
  contributionCount: number;
  color: string;
};

// Props untuk komponen utama
type GitGraphProps = {
  username: string;
};

// Komponen untuk setiap kotak hari
function DaySquare({ day }: { day: DayContribution }) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Mendapatkan level kontribusi (0-4) dari warna
  const levelMatch = day.color.match(/data-level-(\d+)/);
  const level = levelMatch ? parseInt(levelMatch[1], 10) : 0;

  // Menggunakan warna dari GitHub secara langsung
  const colorMap: { [key: string]: string } = {
    "#ebedf0": "#2d333b", // Warna default untuk nol kontribusi
    "#9be9a8": "#0e4429",
    "#40c463": "#006d32",
    "#30a14e": "#26a641",
    "#216e39": "#39d353",
  };
  const displayColor = colorMap[day.color] || day.color;

  return (
    <motion.div
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
      className="w-3.5 h-3.5 rounded-sm relative cursor-pointer"
      style={{ backgroundColor: displayColor, transformStyle: "preserve-3d" }}
      whileHover={{
        scale: 1.6,
        z: 30,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
    >
      {/* Lapisan 3D untuk memberikan efek ketinggian */}
      <motion.div
        className="absolute w-full h-full rounded-sm"
        style={{
          backgroundColor: displayColor,
          transform: `translateZ(${(level + 1) * 2.5}px)`,
          boxShadow: `0 0 8px ${level > 0 ? displayColor : "transparent"}`,
        }}
      />

      {/* Tooltip yang lebih informatif */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-gray-950 border border-green-500/30 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none"
          >
            <span className="font-bold text-green-400">
              {day.contributionCount} contributions
            </span>{" "}
            on{" "}
            {new Date(day.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Komponen utama
export default function InteractiveGitGraph({ username }: GitGraphProps) {
  const [contributions, setContributions] = useState<DayContribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  useEffect(() => {
    async function fetchContributions() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/github-contributions?username=${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub contribution data.");
        }
        const data = await response.json();
        setContributions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContributions();
  }, [username]);

  // Gunakan useSpring untuk animasi yang lebih halus saat mouse meninggalkan komponen
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 400], [20, -20]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 800], [-20, 20]),
    springConfig
  );

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* === DESKRIPSI BARU YANG LEBIH DETAIL === */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-green-400">&lt;</span>
            <span className="text-white">The Digital Footprint</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-green-500 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="text-gray-400 text-base md:text-lg leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            This isn't just a grid of colored squares; it's a living
            visualization of my dedication. Each cell represents a day, and its
            height signifies the volume of code, ideas, and solutions I've
            contributed. This interactive 3D graph is a real-time reflection of
            my journey, showcasing my consistency, passion for problem-solving,
            and the continuous effort I invest in honing my craft.
          </motion.p>
        </div>

        <div
          ref={containerRef}
          onMouseMove={(e) => {
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect();
              mouseX.set(e.clientX - rect.left);
              mouseY.set(e.clientY - rect.top);
            }
          }}
          onMouseLeave={() => {
            mouseX.set(Infinity);
            mouseY.set(Infinity);
          }}
          className="w-full bg-gray-900/50 backdrop-blur-sm rounded-xl border border-green-500/20 p-8 flex items-center justify-center min-h-[350px] relative overflow-hidden"
          style={{ perspective: "2000px" }}
        >
          {/* Efek glow di background */}
          <motion.div
            className="absolute w-[600px] h-[300px] bg-green-500/10 rounded-full blur-3xl"
            style={{
              top: mouseY,
              left: mouseX,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="w-12 h-12 text-green-400 animate-spin" />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-center"
              >
                <AlertTriangle className="mx-auto mb-2" /> {error}
              </motion.div>
            ) : (
              <motion.div
                style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
                className="grid grid-flow-col grid-rows-7 gap-1.5"
              >
                {contributions.map((day) => (
                  <DaySquare key={day.date} day={day} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* === CALL TO ACTION BARU === */}
        <motion.div
          className="text-center mt-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-lg text-green-400 border-2 border-green-500/40 rounded-lg px-8 py-4 hover:bg-green-500/10 hover:border-green-500 transition-all duration-300 group shadow-lg shadow-green-500/5 hover:shadow-green-500/20"
          >
            <Github size={22} />
            <span className="font-semibold">
              Explore My Full GitHub Profile
            </span>
            <ArrowRight
              size={22}
              className="transform transition-transform group-hover:translate-x-2"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
