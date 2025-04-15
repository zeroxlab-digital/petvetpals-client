"use client";
import { HiOutlineCheckBadge, HiArrowSmallRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef } from "react";

const HeroSection = () => {
    const slides = [
        {
            title: "Expert Online Vet Services",
            description: "Get instant virtual consultations from licensed veterinarians. Available 24/7 for your pet's health and wellness.",
            buttonText: "Consult Now",
            image: "/images/cat-vet.jpg",
            services: [
                "24/7 online vet consultations",
                "Prescription services at affordable rates",
                "Personalized pet health advice",
            ]
        },
        {
            title: "Premium Pet Supplies",
            description: "Shop high-quality pet food, toys, and accessories. Enjoy fast, reliable doorstep delivery.",
            buttonText: "Shop Now",
            image: "/images/dog-white-yellow.jpg",
            services: [
                "Top-rated pet food brands",
                "Organic and grain-free options",
                "Interactive toys and accessories",
            ]
        },
        {
            title: "One-stop Pet Solution",
            description: "All-in-one platform for pet care, grooming, veterinary services, and pet adoption. We bring pawsitivity to every home!",
            buttonText: "Learn More",
            image: "/images/pet-dog-yellow.jpg",
            services: [
                "Find professional pet groomers",
                "Book pet boarding and daycare",
                "Join our pet community for tips & support",
            ]
        },
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
                            className="hero-section-hero rounded-md p-5 bg-primary relative overflow-hidden"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                                // height: "350px",
                            }}
                        >
                            <div className="text-left flex flex-col justify-between h-full">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-primary">{slide.title}</h2>
                                    <p className="mt-2 mb-5 text-gray-900 text-sm md:text-base">{slide.description}</p>
                                    <ul>
                                        {slide.services.map((service, index) => (
                                            <li key={index} className="text-gray-800 text-xs md:text-sm flex items-center gap-2 mb-2 last:mb-0">
                                                <HiOutlineCheckBadge className="text-lg" /> {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="mt-auto w-44 h-11 bg-[#481d3f] font-semibold hover:bg-primary  text-white duration-150 rounded-md flex items-center gap-2 justify-center text-sm md:text-[15px]">
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
