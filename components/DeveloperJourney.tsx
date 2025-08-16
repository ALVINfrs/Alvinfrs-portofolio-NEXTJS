// components/DeveloperJourney.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Star,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

// Tipe untuk setiap item di timeline
type JourneyItem = {
  type: "Education" | "Project" | "Certification" | "Milestone";
  title: string;
  date: string;
  description: string;
  issuer?: string; // Tambahkan issuer untuk sertifikat
  details?: string[];
  link?: string;
  image?: string; // Tambahkan properti gambar
};

// DATA BARU YANG SANGAT LENGKAP DAN DISUSUN KEMBALI DALAM BAHASA INGGRIS
const journeyData: JourneyItem[] = [
  {
    type: "Education",
    title: "Began Informatics Engineering Studies",
    date: "September 2023",
    description:
      "Embarked on a formal journey into computer science at Universitas Indraprasta PGRI, building a strong foundation in algorithms, data structures, and software engineering principles.",
    details: [
      "Java Fundamentals",
      "Object-Oriented Programming",
      "Database Systems",
    ],
  },
  {
    type: "Certification",
    title: "Web Programming Certification",
    issuer: "ID Camp, Dicoding",
    date: "October 2024",
    description:
      "Achieved my first fundamental certification, establishing a solid groundwork in HTML, CSS, and the core mechanics of JavaScript.",
    details: ["HTML", "CSS", "Web Fundamentals", "Git"],
  },
  {
    type: "Certification",
    title: "Frontend Web Development",
    issuer: "Dicoding",
    date: "November 2024",
    description:
      "Deepened my frontend expertise by mastering modern, responsive, and interactive web development techniques.",
    details: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  },
  {
    type: "Certification",
    title: "JavaScript Fundamentals",
    issuer: "ID Camp, Dicoding",
    date: "January 2025",
    description:
      "Mastered the core concepts of JavaScript and modern ES6+ features, paving the way for more complex application development.",
    details: ["JavaScript", "ES6+", "DOM Manipulation", "Async/Await"],
  },
  {
    type: "Milestone",
    title: "Mastering the React Ecosystem",
    date: "February 2025",
    description:
      "Transitioned from vanilla JavaScript to the React ecosystem, then leveled up to Next.js for building powerful, scalable full-stack applications.",
    details: [
      "React Hooks",
      "State Management",
      "Server-Side Rendering (SSR)",
      "API Routes",
    ],
  },
  {
    type: "Certification",
    title: "React Developer Certification",
    issuer: "ID Camp, Dicoding",
    date: "March 2025",
    description:
      "Validated my skills in advanced React development, including hooks, context API, and modern design patterns.",
    details: ["React", "Hooks", "Context API", "Modern Patterns"],
  },
  {
    type: "Project",
    title: 'Launched "Kardiologiku"',
    date: "April 2025",
    description:
      "Built an interactive health education website using React and Vite, focusing on a clean UI/UX and a seamless user experience.",
    details: ["React", "Vite", "TypeScript", "Shadcn UI", "Tailwind CSS"],
    link: "https://kardiologiku-landing-page.vercel.app",
    image: "/images/projects/project10.png",
  },
  {
    type: "Certification",
    title: "AWS Cloud Practitioner",
    issuer: "Dicoding",
    date: "June 2025",
    description:
      "Entered the world of cloud computing by learning the fundamentals of architecture and services on Amazon Web Services.",
    details: ["AWS Core Services", "Cloud Architecture", "Security", "Pricing"],
  },
  {
    type: "Certification",
    title: "Artificial Intelligence for Beginners",
    issuer: "Dicoding",
    date: "July 2025",
    description:
      "Took my first step into AI, learning the basic concepts of machine learning and its implementation with Python.",
    details: ["AI Concepts", "Machine Learning", "Python", "Model Evaluation"],
  },
  {
    type: "Project",
    title: 'Released "Caffeine Coffee Shop"',
    date: "July 2025",
    description:
      "Developed my first end-to-end full-stack e-commerce application, complete with a reservation system and Midtrans payment integration.",
    details: ["Next.js", "Express.js", "MySQL", "Payment Gateway"],
    link: "https://caffeine-fullstack-fix.vercel.app/",
    image: "/images/projects/Project9.png",
  },
  {
    type: "Certification",
    title: "Alibaba Cloud Certified Developer - Generative AI",
    issuer: "Alibaba Cloud",
    date: "August 2025",
    description:
      "Explored cutting-edge AI technology, earning a certification in generative AI development from Alibaba Cloud.",
    details: ["Generative AI", "Alibaba Cloud", "Model Deployment"],
  },
  {
    type: "Project",
    title: 'Launched "Ngestream"',
    date: "August 2025",
    description:
      "An ambitious full-stack project—a Netflix clone built with Supabase for real-time authentication and database management.",
    details: [
      "User Authentication (OAuth)",
      "PostgreSQL",
      "Real-time Features",
    ],
    link: "https://ngestream.vercel.app/",
    image: "/images/projects/Ngestream.png",
  },
  {
    type: "Certification",
    title: "Backend Development with JavaScript and AWS",
    issuer: "AWS Backend Academy, Dicoding",
    date: "September 2025",
    description:
      "Deepened my backend expertise comprehensively, from Node.js and Express to the fundamentals of AWS services.",
    details: ["Node.js", "Express", "Hapi", "AWS Fundamentals"],
  },
  {
    type: "Milestone",
    title: "Venturing into Data Science",
    date: "Late 2025",
    description:
      "Broadened my horizons into the data science field, learning how to process, visualize, and draw insights from complex datasets.",
    details: ["Python", "Pandas", "Numpy", "Matplotlib", "Seaborn"],
  },
];

// Helper untuk ikon dan warna
const getTypeStyle = (type: JourneyItem["type"]) => {
  switch (type) {
    case "Education":
      return {
        icon: <GraduationCap />,
        color: "text-blue-400",
        borderColor: "border-blue-500/50",
      };
    case "Project":
      return {
        icon: <Briefcase />,
        color: "text-purple-400",
        borderColor: "border-purple-500/50",
      };
    case "Certification":
      return {
        icon: <Award />,
        color: "text-yellow-400",
        borderColor: "border-yellow-500/50",
      };
    case "Milestone":
      return {
        icon: <Star />,
        color: "text-green-400",
        borderColor: "border-green-500/50",
      };
    default:
      return { icon: null, color: "", borderColor: "" };
  }
};

const JourneyCard = ({
  item,
  isLast,
}: {
  item: JourneyItem;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  const typeStyle = getTypeStyle(item.type);

  return (
    <div ref={ref} className="flex gap-4 md:gap-8 relative">
      <div className="flex flex-col items-center">
        <motion.div
          style={{ opacity }}
          className={`sticky top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 ${typeStyle.borderColor} bg-gray-900 flex items-center justify-center ${typeStyle.color} shrink-0`}
        >
          <div className="w-14 h-14 rounded-full bg-gray-800/50 flex items-center justify-center">
            {typeStyle.icon}
          </div>
        </motion.div>
        {!isLast && (
          <div className="w-0.5 flex-grow bg-gradient-to-b from-green-500/30 to-purple-500/30 -mt-4"></div>
        )}
      </div>

      <motion.div
        style={{ y, scale }}
        className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/20 p-6 mb-16"
      >
        {item.image && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 border border-green-500/20 shadow-lg">
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <p className={`text-sm font-semibold mb-2 ${typeStyle.color}`}>
          {item.date} • {item.issuer || item.type}
        </p>
        <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
        <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>
        {item.details && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.details.map((detail, i) => (
              <div
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600"
              >
                {detail}
              </div>
            ))}
          </div>
        )}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:underline font-semibold group"
          >
            Visit Project{" "}
            <ExternalLink
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        )}
      </motion.div>
    </div>
  );
};

export default function DeveloperJourney() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-green-400">&lt;</span>
            <span className="text-white">My Developer Journey</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A timeline of my growth, key projects, and milestones. From my first
            line of code to my latest deployment.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {journeyData.map((item, index) => (
            <JourneyCard
              key={index}
              item={item}
              isLast={index === journeyData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
