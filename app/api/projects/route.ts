// app/api/portfolio/projects/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const projectsData = [
    {
      id: 10,
      name: "Ngestream",
      description:
        "A Netflix clone with Supabase authentication and PostgreSQL.",
      technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      live_url: "https://Ngestream.vercel.app/",
    },
    {
      id: 9,
      name: "Caffeine Coffee Shop",
      description:
        "Fullstack e-commerce for a coffee shop with Midtrans payment gateway.",
      technologies: ["Next.js", "Express.js", "MySQL", "Midtrans"],
      live_url: "https://caffeine-fullstack-fix.vercel.app/",
    },
    {
      id: 11,
      name: "Kardiologiku",
      description:
        "An educational website for arrhythmia with symptom monitoring features.",
      technologies: ["React", "Vite", "TypeScript", "Shadcn UI"],
      live_url: "https://kardiologiku-landing-page.vercel.app",
    },
    {
      id: 3,
      name: "Student Management System",
      description: "CRUD application for student data management.",
      technologies: ["Express.js", "MySQL", "Node.js"],
      live_url: null,
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json({ projects: projectsData });
}
