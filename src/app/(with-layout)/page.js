import HeroSection from "@/components/Landing/HeroSection/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection/FeaturesSection";
import HowWeWork from "@/components/Landing/HowWeWorkSection/HowWeWork";
import PetTypesSection from "@/components/Landing/PetTypesSection/PetTypesSection";
import PopularItemsSection from "@/components/Landing/PopularItemsSection/PopularItemsSection";
import HowItWorksSection from "@/components/Landing/HowItWorksSection/HowItWorksSection";
import PetHealthTrackerSection from "@/components/Landing/PetHealthTrackerSection/PetHealthTrackerSection";
// import AllInOne from "@/landing/AllServicesSection/AllServicesSection";
// import BestDealSection from "@/landing/BestDealSection/BestDealSection";
// import GetStartedSection from "@/landing/GetStartedSection/GetStartedSection";
// import AISyndromeCheckerSection from "@/landing/AISyndromeCheckerSection/AISyndromeCheckerSection";
import BlogsSection from "@/components/Landing/BlogsSection/BlogsSection";
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