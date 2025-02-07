"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { HiArrowSmallRight, HiOutlineCheckBadge } from "react-icons/hi2";

const slides = [
    {
        title: "Expert Online Vet Services",
        description: "Get instant virtual consultations from certified vets, anytime, anywhere.",
        buttonText: "Consult Now",
        image: "/images/cat-medicine-banner.jpg",
        services: [
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
        ]
    },
    {
        title: "Premium Pet Supplies",
        description: "Shop high-quality pet food, toys, and accessories with doorstep delivery.",
        buttonText: "Shop Now",
        image: "/images/pets-banner-foods.webp",
        services: [
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
        ]
    },
    {
        title: "One-stop Pet Solution",
        description: "Where we have everything that your loving mates need. Bringing pawsitivity around the world!",
        buttonText: "Learn More",
        image: "/images/pet-dog-yellow.jpg",
        services: [
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
        ]
    },
];

const HeroSection = () => {
    return (
        <section className="app-container my-7">
            <div className="w-full">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000 }} // Adjusted autoplay delay for better UX
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide
                            key={index}
                            className="rounded-md p-5 bg-primary"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                                height: "350px", // Fixed height for consistency
                            }}
                        >
                            <div className="text-left flex flex-col justify-between h-full">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-semibold text-primary">{slide.title}</h2>
                                    <p className="mt-2 mb-5 text-gray-900 text-sm md:text-base">{slide.description}</p>
                                    <ul>
                                        {slide.services.map((service, index) => (
                                            <li key={index} className="text-gray-800 text-xs md:text-sm flex items-center gap-2 mb-2 last:mb-0">
                                                <HiOutlineCheckBadge className="text-lg" /> {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="mt-auto w-44 h-11 bg-transparent border border-[#58294E] text-primary hover:bg-primary hover:text-white duration-150 rounded flex items-center gap-2 justify-center text-sm md:text-base">
                                    {slide.buttonText} <HiArrowSmallRight />
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default HeroSection;