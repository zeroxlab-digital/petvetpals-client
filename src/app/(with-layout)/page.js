import HeroSection from "@/landing/HeroSection/HeroSection";
import FeaturesSection from "@/landing/FeaturesSection/FeaturesSection";
import HowWeWork from "@/landing/HowWeWorkSection/HowWeWork";
import PetTypesSection from "@/landing/PetTypesSection/PetTypesSection";
import PopularItemsSection from "@/landing/PopularItemsSection/PopularItemsSection";
import HowItWorksSection from "@/landing/HowItWorksSection/HowItWorksSection";
import PetHealthTrackerSection from "../../landing/PetHealthTrackerSection/PetHealthTrackerSection";
// import AllInOne from "@/landing/AllServicesSection/AllServicesSection";
// import BestDealSection from "@/landing/BestDealSection/BestDealSection";
// import GetStartedSection from "@/landing/GetStartedSection/GetStartedSection";
// import AISyndromeCheckerSection from "@/landing/AISyndromeCheckerSection/AISyndromeCheckerSection";
import BlogsSection from "@/landing/BlogsSection/BlogsSection";
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
        <PetHealthTrackerSection />
        <PopularItemsSection />
        {/* <BestDealSection /> */}
        {/* <AISyndromeCheckerSection /> */}
        {/* <AllInOne /> */}
        {/* <GetStartedSection /> */}
        <BlogsSection />
      </main>
      <Footer />
    </>
  );
}

export default Home;