import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import SocialSidebar from "@/components/social-sidebar";
import IdCard from "@/components/id-card";
import MiniGames from "@/components/mini-games";
import CertificatesSection from "@/components/certificates-section";
import Footer from "@/components/footer";
import CodeBackground from "@/components/code-background";
import TerminalBackground from "@/components/terminal-background";
import DevStats from "@/components/dev-stats";
import GitCommitHistory from "@/components/git-commit-history";
import ApiEndpoints from "@/components/api-endpoints";
import InteractiveGitGraph from "@/components/InteractiveGitGraph";
import InteractiveCLI from "@/components/InteractiveCLI";
import DeveloperJourney from "@/components/DeveloperJourney";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-green-400 font-mono overflow-x-hidden">
      <CodeBackground />
      <TerminalBackground />
      <div className="relative z-10">
        <Hero />
        <IdCard />
        <DevStats />
        <AboutSection />
        <DeveloperJourney />
        <SkillsSection />
        <InteractiveGitGraph username="ALVINfrs" />
        <GitCommitHistory />
        <ProjectsSection />
        <ApiEndpoints />
        <CertificatesSection />
        <InteractiveCLI />
        <MiniGames />
        <ContactSection />
        <SocialSidebar />
        <Footer />
      </div>
    </div>
  );
}
