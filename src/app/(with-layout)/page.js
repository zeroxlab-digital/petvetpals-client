import React from "react";
import Footer from "@/components/PetOwners/Footer/Footer";
import HeroSection from "@/components/Landing/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import SymptomCheckerSection from "@/components/Landing/SymptomCheckerSection";
import AiHealthTwin from "@/components/Landing/AiHealthTwin";
import TeleVetSection from "@/components/Landing/TeleVetSection";
import HowWeWorkSection from "@/components/Landing/HowWeWork";
import SmartShopSection from "@/components/Landing/SmartShopSection";
import PetHealthTrackerSection from "@/components/Landing/PetHealthTrackerSection";
import BlogsSection from "@/components/Landing/BlogsSection";

const Home = () => {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesSection />
        <SymptomCheckerSection />
        <AiHealthTwin />
        <TeleVetSection />
        <HowWeWorkSection />
        <SmartShopSection />
        <PetHealthTrackerSection />
        <BlogsSection />
      </main>
      <Footer />
    </>
  );
}

export default Home;