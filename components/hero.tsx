"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Menu, X, Download } from "lucide-react";

// Responsive Header Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <span className="text-green-400">My</span>Portfolio
        </div>
        <nav className="hidden md:flex space-x-6">
          <a
            href="#about"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Projects
          </a>
          <a
            href="#certificates"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Certificates
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Contact
          </a>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-gray-900/90 backdrop-blur-sm p-4 rounded-b-lg shadow-lg"
        >
          <nav className="flex flex-col space-y-4 items-center">
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-green-400 transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-green-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#certificates"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-green-400 transition-colors"
            >
              Certificates
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-green-400 transition-colors"
            >
              Contact
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "> Hello, I'm Muhammad Alvin Faris";
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText]);

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12 },
    },
  };

  const subtitle = "Full Stack Developer & Tech Enthusiast";

  const bioCodeLines = [
    "interface StudentDeveloper {",
    "  university: string;",
    "  semester: number;",
    "  passion: string[];",
    "  focus: string[];",
    "  learningGoal: string;",
    "}",
    "",
    "const alvin: StudentDeveloper = {",
    "  university: 'Universitas Indraprasta PGRI',",
    "  semester: 4,",
    "  passion: ['Web Dev', 'Innovation', 'Software Eng'],", // Shortened for mobile
    "  focus: ['Responsive Websites', 'User-Friendly Apps'],", // Shortened for mobile
    "  learningGoal: 'Continuously explore new tech',", // Shortened for mobile
    "};",
    "",
    "// Crafting digital experiences with code",
    "console.log(`Studying at ${alvin.university}`);", // Simplified for brevity
  ];

  const codeBlockSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: typingComplete ? 1.5 : 3.5,
        duration: 0.8,
      },
    },
  };

  const codeLineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.07,
        duration: 0.4,
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden p-4 pt-24 md:pt-20">
      <Header />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
      </div>
      <motion.div
        ref={containerRef}
        className="container mx-auto px-4 z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Typing Text Container */}
          <div className="mb-6 inline-block bg-black/60 backdrop-blur-md p-3 sm:p-4 rounded-lg border border-green-500/40 shadow-lg shadow-green-500/10">
            {/* Responsive Typing Text */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 font-mono text-green-400">
              {text}
              <span
                className={`${
                  showCursor ? "opacity-100" : "opacity-0"
                } transition-opacity`}
              >
                _
              </span>
            </h1>

            {/* Subtitle */}
            {typingComplete && (
              <motion.h2
                className="text-base sm:text-lg md:text-2xl text-purple-300 mt-4"
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
              >
                {subtitle.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>
            )}
          </div>

          {/* Bio Code Block Section */}
          {typingComplete && (
            <motion.div
              ref={codeBlockRef}
              className="mt-8 max-w-xs sm:max-w-md md:max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-sm rounded-lg border border-green-500/30 p-4 overflow-hidden shadow-xl shadow-green-500/10"
              variants={codeBlockSectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center mb-3 border-b border-green-500/20 pb-2">
                <Code2 className="text-green-400 mr-2" size={18} />
                <span className="text-gray-400 text-xs">bio.ts</span>
              </div>
              <div className="font-mono text-xs md:text-sm text-left max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-gray-800">
                {bioCodeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className="flex"
                    custom={index}
                    variants={codeLineVariants}
                  >
                    <span className="text-gray-500 mr-3 select-none w-5 text-right shrink-0">
                      {index + 1}
                    </span>
                    <span
                      className={`whitespace-pre ${
                        line.match(
                          /\b(interface|const|let|var|string|number|boolean|string\[\])\b/g
                        )
                          ? "text-purple-400"
                          : line.match(
                              /\b(university|semester|passion|focus|learningGoal|alvin)\b/g
                            ) && !line.includes("'")
                          ? "text-blue-300"
                          : line.includes("'")
                          ? "text-green-300"
                          : line.startsWith("//")
                          ? "text-gray-500 italic"
                          : line.match(/({|}|\[|\]|=|:|,|;)/g)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                    >
                      {line}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Explore My Work Button */}
          {/* Tombol Aksi */}
          {typingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: typingComplete ? 2.5 : 4, duration: 0.8 }}
              // PERBAIKAN: Menggunakan flexbox dengan gap dan z-index
              className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              {/* Tombol Explore My Work */}
              <motion.button
                className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition-colors relative overflow-hidden group text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span className="relative z-10">Explore My Work</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </motion.button>

              {/* === TOMBOL RESUME YANG DIPERBAIKI === */}
              <motion.a
                href="https://drive.google.com/file/d/1E4XBjIYwG3Mp1LVOzH8UUvXslmJ1j7M_/view?usp=sharing" // <-- PASTIKAN ANDA MENGGANTI INI
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/80 text-green-400 font-bold rounded-md border border-green-500/50 hover:bg-gray-700/80 hover:border-green-500 transition-all text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                <span>Get My Resume</span>
              </motion.a>
            </motion.div>
          )}
        </div>
      </motion.div>
      {/* Scroll Down Indicator */}
      {typingComplete && (
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: typingComplete ? 3 : 4.5, duration: 1 }}
        >
          <div className="w-6 h-10 border-2 border-green-500 rounded-full flex justify-center items-start pt-1">
            <motion.div
              className="w-1 h-2 bg-green-500 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
