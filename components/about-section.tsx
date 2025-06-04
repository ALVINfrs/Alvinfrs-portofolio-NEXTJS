"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, GraduationCap, BookOpen } from "lucide-react";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const codeLines = [
    "class Developer {",
    "  constructor() {",
    "    this.name = 'Muhammad Alvin Faris';",
    "    this.education = 'Universitas Indraprasta PGRI';",
    "    this.semester = 4;",
    "    this.skills = ['JavaScript', 'React', 'Node.js','Typescript','Next JS,'Express JS'];",
    "  }",
    "",
    "  introduce() {",
    "    return `Hello! I'm ${this.name}, a passionate`,",
    "      + ` web developer and student.`;",
    "  }",
    "}",
    "",
    "const alvin = new Developer();",
    "console.log(alvin.introduce());",
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/80 to-black/0 z-0"></div>

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
            About Me
            <span className="text-green-400">/&gt;</span>
          </motion.h2>

          <motion.div
            className="h-1 w-20 bg-green-500 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Code Block */}
          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-green-500/30 p-4 overflow-hidden"
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center mb-2 border-b border-green-500/20 pb-2">
              <Code2 className="text-green-400 mr-2" size={18} />
              <span className="text-gray-400 text-sm">about.js</span>
            </div>

            <div className="font-mono text-sm">
              {codeLines.map((line, index) => (
                <motion.div
                  key={index}
                  className="flex"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <span className="text-gray-500 mr-4 select-none w-6 text-right">
                    {index + 1}
                  </span>
                  <span
                    className={`
                    ${line.includes("class") ? "text-purple-400" : ""}
                    ${line.includes("constructor") ? "text-yellow-400" : ""}
                    ${line.includes("this.") ? "text-blue-400" : ""}
                    ${
                      line.includes("function") ||
                      line.includes("return") ||
                      line.includes("const")
                        ? "text-yellow-400"
                        : ""
                    }
                    ${line.includes("'") ? "text-green-300" : ""}
                    ${line.includes("console.log") ? "text-blue-300" : ""}
                  `}
                  >
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            className="space-y-6"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-green-500/30 p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="text-green-400 mr-3" size={24} />
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>

              <div className="space-y-4 text-gray-300">
                <p>
                  I am a fourth-semester student at{" "}
                  <span className="text-green-400">
                    Universitas Indraprasta PGRI
                  </span>
                  , actively learning computer science fundamentals such as
                  programming, data structures, algorithms, databases, and
                  software engineering.
                </p>

                <div className="relative pl-4 border-l-2 border-green-500/50">
                  <p className="text-sm">
                    My studies in Java have strengthened my understanding of
                    object-oriented programming, backend development, and
                    software architecture.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-purple-500/30 p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="text-purple-400 mr-3" size={24} />
                <h3 className="text-xl font-bold text-white">
                  Continuous Learning
                </h3>
              </div>

              <div className="space-y-4 text-gray-300">
                <p>
                  Beyond formal education, I have completed online courses from
                  ID Camp and Dicoding, focusing on{" "}
                  <span className="text-purple-400">React.js</span>,{" "}
                  <span className="text-purple-400">JavaScript</span>, and{" "}
                  <span className="text-purple-400">Tailwind CSS</span> to build
                  dynamic and scalable frontend applications.
                </p>

                <div className="relative pl-4 border-l-2 border-purple-500/50">
                  <p className="text-sm">
                    Through AWS Backend Academy, I have gained experience in
                    backend development using Express.js and Hapi.js, working
                    with MySQL, PostgreSQL, and MongoDB to develop RESTful APIs
                    and scalable server-side applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">
                    Frontend Development
                  </span>
                  <span className="text-sm text-green-400">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-300 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "85%" } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">
                    Backend Development
                  </span>
                  <span className="text-sm text-green-400">75%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-300 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "75%" } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">
                    Database Management
                  </span>
                  <span className="text-sm text-green-400">70%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-300 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "70%" } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
