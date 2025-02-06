import BestDealSection from "@/landing/BestDealSection/BestDealSection";
import BlogsSection from "@/landing/BlogsSection/BlogsSection";
import FeaturesSection from "@/landing/FeaturesSection/FeaturesSection";
import HeroSection from "@/landing/HeroSection/HeroSection";
import HowWeWork from "@/landing/HowWeWorkSection/HowWeWork";
import PetTypesSection from "@/landing/PetTypesSection/PetTypesSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PetTypesSection />
      <HowWeWork />
      <BestDealSection />
      <BlogsSection />
    </main>
  );
}

export default Home;