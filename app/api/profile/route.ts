// app/api/portfolio/profile/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const profileData = {
    name: "Muhammad Alvin Faris",
    title: "Full Stack Developer & Tech Enthusiast",
    location: "Jakarta, Indonesia",
    status: "Actively exploring new opportunities in software engineering.",
    socials: {
      github: "https://github.com/ALVINfrs",
      linkedin: "https://www.linkedin.com/in/alvin-faris-89060a31b/",
      instagram: "https://instagram.com/alvnfrs_/",
    },
  };

  // Menambahkan delay artifisial untuk mensimulasikan respons jaringan
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(profileData);
}
