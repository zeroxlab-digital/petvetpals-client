"use client";
import { HiOutlineCheckBadge, HiArrowSmallRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
    const router = useRouter();
    const slides = [
        {
            title: "Smarter Pet Care, All in One Place",
            description: "Keep your pets safe and healthy with PetVetPals. AI tools, virtual vet calls, and custom health tracking make caring for your furry friends easy.",
            buttonText: "Get Started",
            url: "/dashboard",
            image: "/images/cat-vet.jpg",
            services: [
                "AI-Powered pet health assistant",
                "Symptom checker, nutritionist, allergy & itch relief",
                "Online vet consultations anytime",
                "Track your pet's health & growth",
                "Medication & vaccination reminders",
                "Smart pet health records"
            ]
        },
        {
            title: "Premium Products & Trusted Services",
            description: "From nutritious food to interactive toys and soon local pet services — shop and connect with what your pet needs, delivered with care.",
            buttonText: "Shop Now",
            url: "/shop",
            image: "/images/dog-white-yellow.jpg",
            services: [
                "Top-rated food and accessories",
                "Fast & reliable doorstep delivery",
                "Upcoming: grooming, sitting & more",
                "All purchases tracked in your pet profile"
            ]
        }
    ];


    const swiperRef = useRef(null);

    return (
        <section className="app-container my-7 relative">
            <div className="w-full relative">
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 7000 }}
                    modules={[Navigation, Autoplay]}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide
                            key={index}
                            className="hero-section-hero rounded-lg p-4 bg-primary relative overflow-hidden"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                            }}
                        >
                            <div className="text-left flex flex-col justify-between h-full">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-primary max-md:mb-3">{slide.title}</h2>
                                    <p className="max-md:hidden mt-2 mb-5 text-gray-900 text-sm md:text-base">{slide.description}</p>
                                    <ul>
                                        {slide.services.map((service, index) => (
                                            <li key={index} className="text-gray-800 text-xs md:text-sm flex items-center gap-2 mb-2 last:mb-0">
                                                <HiOutlineCheckBadge className="text-lg" /> {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button onClick={() => router.push(slide.url)} className="mt-auto w-44 h-11 bg-[#481d3f] font-semibold hover:bg-primary  text-white duration-150 rounded-md flex items-center gap-2 justify-center text-sm md:text-[15px]">
                                    {slide.buttonText} <HiArrowSmallRight />
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 "
                >
                    <HiChevronLeft className="text-3xl text-gray-300" />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className=" absolute right-0 top-1/2 transform -translate-y-1/2 z-10 "
                >
                    <HiChevronRight className="text-3xl text-gray-300" />
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
