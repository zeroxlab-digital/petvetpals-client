import BestDealSection from "@/landing/BestDealSection/BestDealSection";
import BlogsSection from "@/landing/BlogsSection/BlogsSection";
import FeaturesSection from "@/landing/FeaturesSection/FeaturesSection";
import GetStartedSection from "@/landing/GetStartedSection/GetStartedSection";
import HeroSection from "@/landing/HeroSection/HeroSection";
import HowWeWork from "@/landing/HowWeWorkSection/HowWeWork";
import PetTypesSection from "@/landing/PetTypesSection/PetTypesSection";
import PopularItemsSection from "@/landing/PopularItemsSection/PopularItemsSection";
import HowItWorksSection from "@/landing/HowItWorksSection/HowItWorksSection";
import AllInOne from "@/landing/AllServicesSection/AllServicesSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PetTypesSection />
      <HowItWorksSection />
      <HowWeWork />
      <PopularItemsSection />
      <BestDealSection />
      <AllInOne />
      <GetStartedSection />
      <BlogsSection />
    </main>
  );
}

export default Home;