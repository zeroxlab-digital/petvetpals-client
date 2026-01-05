import FeaturesSection from "@/components/Landing/FeaturesSection/FeaturesSection";
import HowWeWork from "@/components/Landing/HowWeWorkSection/HowWeWork";
import PetHealthTrackerSection from "@/components/Landing/PetHealthTrackerSection/PetHealthTrackerSection";
import BlogsSection from "@/components/Landing/BlogsSection/BlogsSection";
import Footer from "@/components/PetOwners/Footer/Footer";
import AiHealthTwin from "@/components/Landing/AiHealthTwin/AiHealthTwin";
import SymptomCheckerSection from "@/components/Landing/SymptomCheckerSection/SymptomCheckerSection";
import TeleVetSection from "@/components/Landing/TeleVetSection/TeleVetSection";
import SmartShopSection from "@/components/Landing/SmartShopSection/SmartShopSection";
import HeroSection from "@/components/Landing/HeroSection/HeroSection";

const Home = () => {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesSection />
        <SymptomCheckerSection />
        <AiHealthTwin />
        <TeleVetSection />
        <HowWeWork />
        <SmartShopSection />
        <PetHealthTrackerSection />
        <BlogsSection />
      </main>
      <Footer />
    </>
  );
}

export default Home;