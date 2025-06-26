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
} from "lucide-react";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
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
      link: "https://caffeine-fullstack-fix.vercel.app/", // isi link deploy jika sudah ada, misalnya Vercel
      github: "https://github.com/ALVINfrs/caffeine-fullstack-fix", // atau repositori khususnya jika terpisah frontend/backend
      tags: ["fullstack", "nextjs", "express", "mysql"],
      tech: ["Next.js", "Express.js", "MySQL", "Midtrans", "Tailwind CSS"],
      category: "fullstack",
    },
    {
      id: 10,
      title: "Ngestream",
      description:
        "Netflix clone built with Next.js and TypeScript. Features include user authentication via Supabase (magic link and Google OAuth), categorized movie pages (Indonesian, Anime, Korean Drama, etc.), trending section, search functionality, subscriptions, likes, watchlist, and comment system.",
      image: "/Images/projects/Ngestream.png", // Ganti sesuai path gambar kamu
      link: "https://Ngestream.vercel.app/", // Ganti jika sudah dideploy
      github: "https://github.com/ALVINfrs/Ngestream", // Ganti jika frontend/backend terpisah
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
    },
  ];

  const filters = [
    { id: "all", label: "All Projects", icon: Globe },
    { id: "frontend", label: "Frontend", icon: Code2 },
    { id: "backend", label: "Backend", icon: Server },
    { id: "fullstack", label: "Full Stack", icon: Database },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 relative">
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
            <span className="text-white">Projects</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>

          <motion.div
            className="h-1 w-20 bg-green-500 mx-auto mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <motion.button
                key={filter.id}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 border transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-green-500 text-black border-green-500"
                    : "bg-gray-800/80 border-green-500/30 hover:bg-gray-700/80"
                }`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
                whileHover={{ y: -5 }}
              >
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-green-400 group-hover:shadow-lg group-hover:shadow-green-500/20">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
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
                          whileHover={{ scale: 1.1 }}
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
      </motion.div>
    </section>
  );
}
