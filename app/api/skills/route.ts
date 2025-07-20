// app/api/portfolio/skills/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const skillsData = {
    frontend: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
    backend: ["Node.js", "Express", "Java", "Prisma", "Supabase"],
    databases: ["PostgreSQL", "MySQL", "Firebase", "MongoDB"],
    tools_devops: ["Docker", "Git", "GitHub", "AWS", "Vercel"],
  };

  await new Promise((resolve) => setTimeout(resolve, 600));

  return NextResponse.json(skillsData);
}
