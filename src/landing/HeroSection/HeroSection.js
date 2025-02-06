"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { HiShieldCheck } from "react-icons/hi2";

const slides = [
    {
        title: "Expert Online Vet Services",
        description: "Get instant virtual consultations from certified vets, anytime, anywhere.",
        buttonText: "Consult Now",
        image: "/images/vet-service.jpg",
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
        image: "/images/pet-food.jpg",
        services: [
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
            "Guaranteed low Rx prices",
        ]
    },
    {
        title: "Adopt & Give a Home",
        description: "Find a loving pet to adopt and give them the home they deserve.",
        buttonText: "Adopt Now",
        image: "/images/pet-adoption.jpg",
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
        <section className="app-container my-5">
            {/* <div className="grid grid-cols-4 gap-5"> */}
                <div className="">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 1000 }}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide
                                key={index}
                                className="text-white bg-primary rounded-md p-5 "
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "350px",
                                }}
                            >
                                <div className="text-left flex flex-col justify-between h-full">
                                    <div>
                                        <h2 className="text-3xl font-semibold">{slide.title}</h2>
                                        <p className="mt-2 mb-5 text-gray-100">{slide.description}</p>
                                        <ul>
                                            {
                                                slide.services.map((service, index) => (
                                                    <li key={index} className="text-gray-200 text-sm flex items-center gap-2 mb-2  last:mb-0"><HiShieldCheck className="text-lg" /> {service}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <button className="mt-auto w-40 h-10  bg-white text-primary font-semibold rounded">
                                        {slide.buttonText}
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* <div className="col-span-1 border rounded-md p-5">

                </div> */}
            {/* </div> */}
        </section>
    );
};

export default HeroSection;
