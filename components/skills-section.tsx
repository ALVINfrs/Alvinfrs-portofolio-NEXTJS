"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { IconCloud } from "@/components/magicui/icon-cloud";

// 1. Add the 'level' property back to each skill for proficiency calculation
const allSkills = [
  // Frontend
  { name: "JavaScript", category: "frontend", slug: "javascript", level: 95 },
  { name: "TypeScript", category: "frontend", slug: "typescript", level: 80 },
  { name: "React", category: "frontend", slug: "react", level: 90 },
  { name: "Next.js", category: "frontend", slug: "nextdotjs", level: 85 },
  { name: "HTML5", category: "frontend", slug: "html5", level: 95 },
  { name: "CSS3", category: "frontend", slug: "css3", level: 90 },
  {
    name: "Tailwind CSS",
    category: "frontend",
    slug: "tailwindcss",
    level: 88,
  },

  // Backend
  { name: "Node.js", category: "backend", slug: "nodedotjs", level: 85 },
  { name: "Express", category: "backend", slug: "express", level: 80 },
  { name: "Java", category: "backend", slug: "java", level: 75 },
  { name: "Prisma", category: "backend", slug: "prisma", level: 70 },
  { name: "Nginx", category: "backend", slug: "nginx", level: 60 },
  { name: "Supabase", category: "backend", slug: "supabase", level: 72 },
  { name: "Ngrok", category: "backend", slug: "Ngrok", level: 72 },
  { name: "JavaScript", category: "frontend", slug: "javascript", level: 95 },
  { name: "TypeScript", category: "frontend", slug: "typescript", level: 80 },

  // Database
  { name: "PostgreSQL", category: "database", slug: "postgresql", level: 75 },
  { name: "Firebase", category: "database", slug: "firebase", level: 70 },
  { name: "MySQL", category: "database", slug: "mysql", level: 78 },
  { name: "Mongodb", category: "database", slug: "mongodb", level: 78 },

  // Tools & DevOps
  { name: "Docker", category: "tools", slug: "docker", level: 70 },
  { name: "Git", category: "tools", slug: "git", level: 85 },
  { name: "GitHub", category: "tools", slug: "github", level: 85 },
  { name: "AWS", category: "tools", slug: "amazonaws", level: 65 },
  { name: "Vercel", category: "tools", slug: "vercel", level: 80 },
];

const categories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "tools", label: "Tools & DevOps" },
];

export default function FilterableSkillsCloud() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSlugs = useMemo(() => {
    if (activeCategory === "all") {
      return allSkills.map((skill) => skill.slug);
    }
    return allSkills
      .filter((skill) => skill.category === activeCategory)
      .map((skill) => skill.slug);
  }, [activeCategory]);

  const iconImages = filteredSlugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  // 2. Calculate the values for the summary cards
  const frontendCount = allSkills.filter(
    (s) => s.category === "frontend"
  ).length;
  const backendCount = allSkills.filter((s) => s.category === "backend").length;
  const averageProficiency = Math.round(
    allSkills.reduce((acc, skill) => acc + skill.level, 0) / allSkills.length
  );

  return (
    <section className="relative flex flex-col items-center justify-center w-full rounded-lg bg-gray-900/80 backdrop-blur-sm py-16 border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          <span className="text-green-400">&lt;</span>
          Tech Stack
          <span className="text-green-400">/&gt;</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Full-stack technologies and tools I use to build amazing web
          applications
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8 px-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeCategory === category.id
                ? "bg-green-500 text-black shadow-lg shadow-green-500/30"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="w-full h-80 sm:h-96 md:h-[30rem] flex items-center justify-center">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <IconCloud images={iconImages} />
        </motion.div>
      </div>

      {/* 3. Add the Summary Cards section here */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-lg border border-gray-700 p-6 text-center transition-all duration-300 hover:border-green-500 hover:shadow-xl hover:shadow-green-600/10">
          <div className="text-4xl font-bold text-green-400 mb-2">
            {frontendCount}
          </div>
          <div className="text-gray-300">Frontend Technologies</div>
        </div>
        <div className="bg-gray-800/70 backdrop-blur-md rounded-lg border border-gray-700 p-6 text-center transition-all duration-300 hover:border-green-500 hover:shadow-xl hover:shadow-green-600/10">
          <div className="text-4xl font-bold text-green-400 mb-2">
            {backendCount}
          </div>
          <div className="text-gray-300">Backend Technologies</div>
        </div>
        <div className="bg-gray-800/70 backdrop-blur-md rounded-lg border border-gray-700 p-6 text-center transition-all duration-300 hover:border-green-500 hover:shadow-xl hover:shadow-green-600/10">
          <div className="text-4xl font-bold text-green-400 mb-2">
            {averageProficiency}%
          </div>
          <div className="text-gray-300">Average Proficiency</div>
        </div>
      </div>
    </section>
  );
}
