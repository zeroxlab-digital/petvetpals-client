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
import PetHealthTrackerSection from "../../landing/PetHealthTrackerSection/PetHealthTrackerSection";
// import AISyndromeCheckerSection from "@/landing/AISyndromeCheckerSection/AISyndromeCheckerSection";
import Footer from "@/components/PetOwners/Footer/Footer";

const Home = () => {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesSection />
        <PetTypesSection />
        <HowItWorksSection />
        <HowWeWork />
        <PopularItemsSection />
        <BestDealSection />
        <PetHealthTrackerSection />
        {/* <AISyndromeCheckerSection /> */}
        <AllInOne />
        <GetStartedSection />
        <BlogsSection />
      </main>
      <Footer />
    </>
  );
}

export default Home;