import BestDealSection from "@/landing/BestDealSection/BestDealSection";
import FeaturesSection from "@/landing/FeaturesSection/FeaturesSection";
import HeroSection from "@/landing/HeroSection/HeroSection";
import HowWeWork from "@/landing/HowWeWorkSection/HowWeWork";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowWeWork />
      <BestDealSection />
    </main>
  );
}

export default Home;