"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe as LucideGlobe, // Renamed to avoid conflict, using FaGlobe below
  Wrench,
  Server as LucideServer,
  Database as LucideDatabase,
  Code as LucideCode,
} from "lucide-react";

// Import specific brand icons from react-icons
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  // SiJava, // This was problematic, will use FaJava
  SiPython,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiGit,
  SiDocker,
  // SiAmazonaws, // This was problematic, will use FaAws
  SiVercel,
  SiSupabase,
} from "react-icons/si";

// Import from Font Awesome for alternatives and general icons
import {
  FaPuzzlePiece,
  FaServer,
  FaDatabase,
  FaCode,
  FaBoxes,
  FaNetworkWired,
  FaLayerGroup,
  FaGitAlt,
  FaCloud,
  FaGlobe,
  FaJava, // Using FaJava for Java
  FaAws, // Using FaAws for AWS
} from "react-icons/fa";

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState("all");

  const skills = [
    // Frontend
    {
      name: "React",
      icon: SiReact,
      category: "frontend",
      level: 90,
      color: "#61DAFB",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      category: "frontend",
      level: 85,
      color: "#000000",
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      category: "frontend",
      level: 95,
      color: "#F7DF1E",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      category: "frontend",
      level: 80,
      color: "#3178C6",
    },
    {
      name: "HTML5",
      icon: SiHtml5,
      category: "frontend",
      level: 95,
      color: "#E34F26",
    },
    {
      name: "CSS3",
      icon: SiCss3,
      category: "frontend",
      level: 90,
      color: "#1572B6",
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      category: "frontend",
      level: 88,
      color: "#06B6D4",
    },

    // Backend
    {
      name: "Node.js",
      icon: SiNodedotjs,
      category: "backend",
      level: 85,
      color: "#339933",
    },
    {
      name: "Express.js",
      icon: SiExpress,
      category: "backend",
      level: 80,
      color: "#000000",
    },
    {
      name: "Java",
      icon: FaJava,
      category: "backend",
      level: 75,
      color: "#EA2D2E",
    }, // Using FaJava and a common Java red
    {
      name: "Python",
      icon: SiPython,
      category: "backend",
      level: 70,
      color: "#3776AB",
    },
    {
      name: "GraphQL",
      icon: SiGraphql,
      category: "backend",
      level: 65,
      color: "#E10098",
    },

    // Database
    {
      name: "MongoDB",
      icon: SiMongodb,
      category: "database",
      level: 80,
      color: "#47A248",
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      category: "database",
      level: 75,
      color: "#336791",
    },
    {
      name: "MySQL",
      icon: SiMysql,
      category: "database",
      level: 78,
      color: "#4479A1",
    },
    {
      name: "Redis",
      icon: SiRedis,
      category: "database",
      level: 60,
      color: "#DC382D",
    },

    // DevOps & Tools
    {
      name: "Git",
      icon: SiGit,
      category: "tools",
      level: 85,
      color: "#F05032",
    },
    {
      name: "Docker",
      icon: SiDocker,
      category: "tools",
      level: 70,
      color: "#2496ED",
    },
    {
      name: "AWS",
      icon: FaAws,
      category: "tools",
      level: 65,
      color: "#FF9900",
    }, // Using FaAws and AWS Orange
    {
      name: "Vercel",
      icon: SiVercel,
      category: "tools",
      level: 80,
      color: "#000000",
    },
    {
      name: "Supabase",
      icon: SiSupabase,
      category: "backend",
      level: 72,
      color: "#3ECF8E",
    },
  ];

  const categories = [
    { id: "all", label: "All Skills", icon: FaGlobe, count: skills.length },
    {
      id: "frontend",
      label: "Frontend",
      icon: FaCode,
      count: skills.filter((s) => s.category === "frontend").length,
    },
    {
      id: "backend",
      label: "Backend",
      icon: FaServer,
      count: skills.filter((s) => s.category === "backend").length,
    },
    {
      id: "database",
      label: "Database",
      icon: FaDatabase,
      count: skills.filter((s) => s.category === "database").length,
    },
    {
      id: "tools",
      label: "DevOps & Tools",
      icon: Wrench,
      count: skills.filter((s) => s.category === "tools").length,
    },
  ];

  // ... rest of your component code
  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section id="skills" className="py-20 relative bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900/50 z-0"></div>
      <motion.div
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 inline-block"
            initial={{ y: 50 }}
            animate={isInView ? { y: 0 } : { y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-green-400">&lt;</span>
            <span className="text-white">Tech Stack</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-green-500 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Full-stack technologies and tools I use to build amazing web
            applications
          </motion.p>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                className={`px-4 py-3 rounded-lg text-sm font-medium text-white flex items-center gap-2 border transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-green-500 text-black border-green-600 shadow-lg shadow-green-500/30"
                    : "bg-gray-800/80 border-gray-700 hover:bg-gray-700/90 hover:border-green-500"
                }`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent
                  size={18}
                  className={
                    activeCategory === category.id
                      ? "text-black"
                      : "text-green-400"
                  }
                />
                <span>{category.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeCategory === category.id
                      ? "bg-black/20 text-white"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {category.count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          key={activeCategory}
        >
          {filteredSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={skill.name}
                className="group relative"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ perspective: "1000px" }}
              >
                <div className="bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700 p-6 h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:border-green-500 group-hover:shadow-2xl group-hover:shadow-green-600/20 transform-gpu group-hover:bg-gray-700/80">
                  <div className="mb-4 relative">
                    <IconComponent
                      size={48}
                      style={{ color: skill.color }}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 filter blur-xl"
                      style={{ backgroundColor: skill.color }}
                      animate={
                        isInView
                          ? {
                              opacity: [0, 0.4, 0],
                              scale: [0.8, 1.6, 0.8],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2.5,
                        delay: index * 0.15,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 4 + index * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-gray-200 group-hover:text-white transition-colors mb-3">
                    {skill.name}
                  </h3>
                  <div className="w-full bg-gray-700/70 rounded-full h-2.5 mb-2">
                    <motion.div
                      className="h-2.5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{
                        duration: 1,
                        delay: 0.3 + index * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300">
                    {skill.level}%
                  </span>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-green-500/50 shadow-lg">
                    {skill.name} - {skill.level}%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg border border-gray-700 p-6 text-center transition-all duration-300 hover:border-green-500 hover:shadow-xl hover:shadow-green-600/10">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {skills.filter((s) => s.category === "frontend").length}
            </div>
            <div className="text-gray-300">Frontend Technologies</div>
          </div>
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg border border-gray-700 p-6 text-center transition-all duration-300 hover:border-green-500 hover:shadow-xl hover:shadow-green-600/10">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {skills.filter((s) => s.category === "backend").length}
            </div>
            <div className="text-gray-300">Backend Technologies</div>
          </div>
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg border border-gray-700 p-6 text-center transition-all duration-300 hover:border-green-500 hover:shadow-xl hover:shadow-green-600/10">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {Math.round(
                skills.reduce((acc, skill) => acc + skill.level, 0) /
                  skills.length
              )}
              %
            </div>
            <div className="text-gray-300">Average Proficiency</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
