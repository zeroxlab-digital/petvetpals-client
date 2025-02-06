import BestDealSection from "@/landing/BestDealSection/BestDealSection";
import BlogsSection from "@/landing/BlogsSection/BlogsSection";
import FeaturesSection from "@/landing/FeaturesSection/FeaturesSection";
import HeroSection from "@/landing/HeroSection/HeroSection";
import HowWeWork from "@/landing/HowWeWorkSection/HowWeWork";
import PetTypesSection from "@/landing/PetTypesSection/PetTypesSection";
import PopularItemsSection from "@/landing/PopularItemsSection/PopularItemsSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PetTypesSection />
      <HowWeWork />
      <PopularItemsSection />
      <BestDealSection />
      <BlogsSection />
    </main>
  );
}

export default Home;