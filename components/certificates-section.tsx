"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Award, X, Calendar, Building, CheckCircle } from "lucide-react";

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Updated certificates data
  const certificates = [
    {
      id: 1,
      title: "React Developer Certification",
      issuer: "ID Camp, Dicoding",
      date: "March 2023",
      image: "/Images/certifications/Cert5.png", // Pastikan path ini benar
      description:
        "Advanced React development with hooks, context, and modern patterns",
      skills: ["React", "Hooks", "Context API", "JSX"],
      credentialId: "IDC-REACT-2023-001",
    },
    {
      id: 2,
      title: "AWS Cloud Practitioner",
      issuer: "Dicoding",
      date: "June 2023",
      image: "/Images/certifications/Cert9.png", // Pastikan path ini benar
      description:
        "Backend development with AWS services and cloud architecture",
      skills: ["AWS", "Node.js", "Express", "Cloud"],
      credentialId: "DCD-AWS-2023-002",
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      issuer: "ID Camp, Dicoding",
      date: "January 2023",
      image: "/Images/certifications/Cert4.png", // Pastikan path ini benar
      description: "Core JavaScript concepts and modern ES6+ features",
      skills: ["JavaScript", "ES6+", "DOM", "Async"],
      credentialId: "IDC-JS-2023-003",
    },
    {
      id: 4,
      title: "Frontend Web Development",
      issuer: "Dicoding",
      date: "November 2022",
      image: "/Images/certifications/Cert3.png", // Pastikan path ini benar
      description:
        "Complete frontend development with modern tools and frameworks",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive"],
      credentialId: "DCD-FE-2022-004",
    },
    {
      id: 5,
      title: "Web Programming Certification",
      issuer: "ID Camp, Dicoding",
      date: "October 2022",
      image: "/Images/certifications/Cert6.png", // Pastikan path ini benar
      description:
        "Foundational web development using HTML, CSS, JavaScript, and best practices",
      skills: ["HTML", "CSS", "JavaScript", "Git", "Web Fundamentals"],
      credentialId: "IDC-WEB-2022-005",
    },
    {
      id: 6,
      title: "Artificial Intelligence for Beginners",
      issuer: "Dicoding",
      date: "July 2023",
      image: "/Images/certifications/Cert2.png", // Pastikan path ini benar
      description:
        "Introduction to AI, supervised/unsupervised learning, and real-world implementation",
      skills: ["AI", "Machine Learning", "Python", "Model Evaluation"],
      credentialId: "DCD-AI-2023-006",
    },
    {
      id: 7,
      title: "Alibaba Cloud Certified Developer - Generative AI",
      issuer: "Alibaba Cloud",
      date: "August 2023",
      image: "/Images/certifications/Cert1.png", // Pastikan path ini benar
      description:
        "Generative AI development and cloud integration with Alibaba Cloud services",
      skills: ["AI", "Generative AI", "Alibaba Cloud", "Model Deployment"],
      credentialId: "ALI-GAI-2023-007",
    },
    {
      id: 8,
      title: "Backend Development with JavaScript and AWS",
      issuer: "AWS Backend Academy, Dicoding",
      date: "September 2023",
      image: "/Images/certifications/Cert10.png", // Pastikan path ini benar
      description:
        "Comprehensive backend development using Node.js, Express, Hapi, and AWS fundamentals",
      skills: ["Backend", "JavaScript", "Node.js", "Express", "Hapi", "AWS"],
      credentialId: "AWSJS-BACKEND-2023-008",
    },
    {
      id: 9,
      title: "Java Programming Certification",
      issuer: "Dicoding",
      date: "October 2023",
      image: "/Images/certifications/Cert11.png", // Pastikan path ini benar
      description:
        "Object-oriented programming in Java, collections, and basic algorithmic implementation",
      skills: ["Java", "OOP", "Data Structures", "Basic Algorithms"],
      credentialId: "DCD-JAVA-2023-009",
    },
    {
      id: 10,
      title: "Data Visualization Certification",
      issuer: "Dicoding",
      date: "November 2023",
      image: "/Images/certifications/Cert8.png", // Pastikan path ini benar
      description:
        "Visualizing data with Python using matplotlib, seaborn, and storytelling principles",
      skills: ["Data Visualization", "Python", "Matplotlib", "Seaborn"],
      credentialId: "DCD-VIZ-2023-010",
    },
    {
      id: 11,
      title: "Data Science for Beginners",
      issuer: "Dicoding",
      date: "December 2023",
      image: "/Images/certifications/Cert7.png", // Pastikan path ini benar
      description:
        "Data science foundations: statistics, data wrangling, and modeling using Python",
      skills: ["Data Science", "Python", "Pandas", "Numpy", "Modeling"],
      credentialId: "DCD-DS-2023-011",
    },
  ];

  return (
    <section id="certificates" className="py-20 relative">
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
            <span className="text-white">Certifications</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>

          <motion.div
            className="h-1 w-20 bg-green-500 mx-auto mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Certificates Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              layoutId={`cert-${cert.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedCert(cert.id)}
              whileHover={{ y: -5, rotateY: 5 }}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-green-400 group-hover:shadow-lg group-hover:shadow-green-500/20">
                <div className="relative h-40 overflow-hidden bg-gray-700">
                  {" "}
                  {/* Tinggi diubah agar gambar lebih pas */}
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" // object-contain agar gambar utuh
                  />
                  {/* Icon bisa ditambahkan sebagai overlay jika diinginkan */}
                  {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Award className="text-green-400" size={48} />
                  </div> */}
                  <div className="absolute top-2 right-2 p-1 bg-gray-900/50 rounded-full">
                    <CheckCircle className="text-green-400" size={20} />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    <Building size={14} className="text-gray-400" />
                    <span className="text-gray-400 text-sm">{cert.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-gray-400 text-sm">{cert.date}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-auto">
                    {cert.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 2 && (
                      <span className="text-xs px-2 py-1 rounded bg-gray-500/20 text-gray-400">
                        +{cert.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert !== null && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                layoutId={`cert-${selectedCert}`}
                className="bg-gray-900 rounded-xl border border-green-500/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col" // Tambah flex flex-col
                onClick={(e) => e.stopPropagation()}
              >
                {certificates
                  .filter((c) => c.id === selectedCert)
                  .map((cert) => (
                    <div key={cert.id} className="flex flex-col">
                      {" "}
                      {/* Tambah flex flex-col */}
                      <div className="relative h-auto md:h-[350px] bg-gray-800 flex items-center justify-center p-4">
                        {" "}
                        {/* Sesuaikan tinggi dan padding */}
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="max-w-full max-h-full object-contain rounded-md" // object-contain dan styling
                        />
                        <motion.button
                          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                          onClick={() => setSelectedCert(null)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X size={20} />
                        </motion.button>
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4 text-white">
                          {cert.title}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-green-400 text-sm font-bold mb-2">
                              ISSUER
                            </div>
                            <div className="text-white">{cert.issuer}</div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-green-400 text-sm font-bold mb-2">
                              DATE ISSUED
                            </div>
                            <div className="text-white">{cert.date}</div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-green-400 text-sm font-bold mb-2">
                              CREDENTIAL ID
                            </div>
                            <div className="text-white font-mono text-sm">
                              {cert.credentialId}
                            </div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-green-400 text-sm font-bold mb-2">
                              STATUS
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle
                                className="text-green-400"
                                size={16}
                              />
                              <span className="text-green-400">Verified</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="text-green-400 text-sm font-bold mb-2">
                            DESCRIPTION
                          </div>
                          <p className="text-gray-300">{cert.description}</p>
                        </div>

                        <div>
                          <div className="text-green-400 text-sm font-bold mb-3">
                            SKILLS COVERED
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {cert.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
