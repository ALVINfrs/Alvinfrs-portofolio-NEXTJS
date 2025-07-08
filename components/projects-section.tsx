"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Code2,
  Database,
  Globe,
  Server,
  Star,
} from "lucide-react";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("featured"); // Start with featured projects
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const projects = [
    {
      id: 1,
      title: "Coffee Shop Landing",
      description:
        "Modern coffee shop landing page with smooth animations and responsive design",
      image: "/Images/projects/Project1.png",
      link: "https://kedaikopialvnfrs.vercel.app/",
      github: "https://github.com/ALVINfrs",
      tags: ["frontend", "html", "css"],
      tech: ["HTML5", "CSS3", "JavaScript"],
      category: "frontend",
    },
    {
      id: 2,
      title: "Movie Discovery App",
      description:
        "React-based movie discovery app with API integration and search functionality",
      image: "/Images/projects/Project2.png",
      link: "https://alvnfrsfilmss.vercel.app/",
      github: "https://github.com/ALVINfrs",
      tags: ["frontend", "react", "api"],
      tech: ["React", "API", "CSS"],
      category: "frontend",
    },
    {
      id: 3,
      title: "Student Management System",
      description:
        "Full-stack CRUD application for student data management with MySQL database",
      image: "/Images/projects/Project3.png",
      link: "",
      github: "https://github.com/ALVINfrs/db_nodejs",
      tags: ["fullstack", "express", "mysql"],
      tech: ["Express.js", "MySQL", "Node.js"],
      category: "fullstack",
    },
    {
      id: 4,
      title: "Travel Agency Landing",
      description:
        "Beautiful travel agency website with modern UI and engaging visuals",
      image: "/Images/projects/Project4.png",
      link: "https://alvnfrsttravel-and-tour.vercel.app/",
      github: "https://github.com/ALVINfrs",
      tags: ["frontend", "html", "css"],
      tech: ["HTML5", "CSS3", "JavaScript"],
      category: "frontend",
    },
    {
      id: 5,
      title: "Bookshelf Manager",
      description:
        "Interactive bookshelf app with local storage and DOM manipulation",
      image: "/Images/projects/Project5.png",
      link: "https://bookshelf-alvnfrss.vercel.app/",
      github: "https://github.com/ALVINfrs/Bookshelf-App-DOM-manipulation",
      tags: ["frontend", "javascript"],
      tech: ["JavaScript", "LocalStorage", "DOM"],
      category: "frontend",
    },
    {
      id: 6,
      title: "Train Ticket API",
      description:
        "RESTful API for train ticket booking with authentication and real-time updates",
      image: "/Images/projects/Project8.png",
      link: "",
      github: "https://github.com/ALVINfrs/api_tiketKereta",
      tags: ["backend", "express", "mysql", "api"],
      tech: ["Express.js", "MySQL", "JWT"],
      category: "backend",
    },
    {
      id: 7,
      title: "Note App",
      description:
        "React-based note-taking app with local storage, modern UI, and CRUD functionality",
      image: "/Images/projects/Project6.png",
      link: "https://my-note-app-tan.vercel.app/",
      github: "https://github.com/ALVINfrs/My-note-app",
      tags: ["frontend", "react"],
      tech: ["React", "LocalStorage", "JavaScript"],
      category: "frontend",
    },
    {
      id: 8,
      title: "Bookshelf API",
      description:
        "RESTful API for book management built with Hapi.js and full CRUD support",
      image: "/Images/projects/Project7.png",
      link: "",
      github: "https://github.com/ALVINfrs/Bookshelf-API",
      tags: ["backend", "hapi", "api"],
      tech: ["Hapi.js", "Node.js"],
      category: "backend",
    },
    {
      id: 9,
      title: "Caffeine Coffee Shop",
      description:
        "Fullstack online coffee shop built with Next.js and Express.js. Features include user panel with reservation management, order history, e-receipt printing, and integrated Midtrans payment gateway.",
      image: "/Images/projects/Project9.png",
      link: "https://caffeine-fullstack-fix.vercel.app/",
      github: "https://github.com/ALVINfrs/caffeine-fullstack-fix",
      tags: ["fullstack", "nextjs", "express", "mysql"],
      tech: [
        "Next.js",
        "Express.js",
        "MySQL",
        "Midtrans",
        "Tailwind CSS",
        "Typescript",
      ],
      category: "fullstack",
      featured: true,
    },
    {
      id: 10,
      title: "Ngestream",
      description:
        "Netflix clone built with Next.js and TypeScript. Features include user authentication via Supabase (magic link and Google OAuth), categorized movie pages, trending section, search functionality, subscriptions, likes, watchlist, and comment system.",
      image: "/Images/projects/Ngestream.png",
      link: "https://Ngestream.vercel.app/",
      github: "https://github.com/ALVINfrs/Ngestream",
      tags: ["fullstack", "nextjs", "supabase", "postgresql", "typescript"],
      tech: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "ShadCN UI",
        "Tailwind CSS",
      ],
      category: "fullstack",
      featured: true,
    },
    {
      id: 11,
      title: "Kardiologiku ",
      description:
        "A comprehensive educational website for arrhythmia, offering features like symptom monitoring, doctor consultations, and detailed medication information. Built with modern tools like React, Vite, and Shadcn UI for a clean and responsive user experience.",
      image: "/Images/projects/Project10.png",
      link: "https://kardiologiku-landing-page.vercel.app",
      github: "https://github.com/ALVINfrs/Kardiologiku-Landing-Page",
      tags: ["frontend", "react", "vite", "typescript", "shadcn", "tailwind"],
      tech: [
        "React",
        "Vite",
        "TypeScript",
        "Local Storage",
        "Shadcn UI",
        "Tailwind CSS",
      ],
      category: "frontend",
      featured: true,
    },
  ];

  const filters = [
    { id: "featured", label: "Featured", icon: Star },
    { id: "all", label: "All Projects", icon: Globe },
    { id: "frontend", label: "Frontend", icon: Code2 },
    { id: "backend", label: "Backend", icon: Server },
    { id: "fullstack", label: "Full Stack", icon: Database },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "featured") {
      return project.featured;
    }
    if (activeFilter === "all") {
      return true;
    }
    return project.category === activeFilter;
  });

  // Animation variants for project cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  // Animation variants for filter buttons
  const filterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="projects" className="py-20 relative">
      <motion.div
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 inline-block"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-green-400">&lt;</span>
            <span className="text-white">Projects</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>

          <motion.div
            className="h-1 w-20 bg-green-500 mx-auto mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
        </div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filters.map((filter, index) => {
            const IconComponent = filter.icon;
            return (
              <motion.button
                key={filter.id}
                custom={index}
                variants={filterVariants}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 border transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-green-500 text-black border-green-500"
                    : "bg-gray-800/80 border-green-500/30 hover:bg-gray-700/80"
                }`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 10px rgba(34, 197, 94, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent size={16} />
                {filter.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 10px 20px rgba(34, 197, 94, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-green-400 group-hover:shadow-lg group-hover:shadow-green-500/20">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: techIndex * 0.05,
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                        </motion.a>
                      )}
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* See More Button */}
        {activeFilter === "featured" && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              className="px-6 py-3 rounded-lg text-sm bg-green-500 text-black border border-green-500 hover:bg-green-600 transition-all duration-300"
              onClick={() => setActiveFilter("all")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              See More Projects
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
