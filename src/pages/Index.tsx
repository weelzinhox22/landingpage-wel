import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import { HeroParallax } from "@/components/HeroParallax";
import Introduction from "@/components/Introduction";
import ClientJourney from "@/components/ClientJourney";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <Layout>
      <SEO />
      <Header />
      
      <main className="relative z-10 bg-[#020525] text-white selection:bg-neon-pink selection:text-white shadow-2xl">
        <div id="home">
          <HeroParallax />
        </div>
        
        <div id="intro">
          <Introduction />
        </div>

        {/* Visual Break / Scrolltelling Feature */}
        <div className="relative z-10 bg-background">
           <ClientJourney />
        </div>



        <div id="projects">
          <ProjectsSection />
        </div>

        <div id="about">
          <AboutSection />
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </Layout>
  );
};

export default Index;