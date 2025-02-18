import Image from "next/image";
import "./AllServicesSection.css";

const AllServicesSection = () => {
    return (
        <section className="">
            <div className="app-container lg:mx-60 all-service-cont pt-36 pb-8 max-lg:text-center max-lg:space-y-5">
                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-20 max-lg:gap-10 justify-between items-start item ">
                    <div>
                        <h2 className="text-primary text-3xl max-sm:text-2xl font-bold mb-16">One-Stop Comprehensive Pet Care at Your Fingertips</h2>
                        <h6 className="text-primary text-xl font-bold mb-3">Online Vet Consultation</h6>
                        <p className="text-gray-700">
                            Connect with licensed veterinarians from the comfort of your home. Get expert advice, prescriptions, and personalized care plans for your pets.
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image src="/images/dog-app-1.avif" alt="Online Vet Consultation" width={300} height={300} className="w-96" />
                    </div>
                </div>
                <div className="grid grid-cols-2  max-lg:grid-cols-1 gap-20 max-lg:gap-10 justify-between items-center item">
                    <div className="flex justify-center items-center max-lg:order-2">
                        <Image src="/images/dog-app-1.avif" alt="Vet Chat Video Calls" width={300} height={300} className="w-96" />
                    </div>
                    <div>
                        <h6 className="text-primary text-xl font-bold mb-3">Vet Chat & Video Calls</h6>
                        <p className="text-gray-700">
                            Instantly chat with vets or schedule video calls for real-time consultations, ensuring your pet’s health is always a priority.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2  max-lg:grid-cols-1 gap-20 max-lg:gap-10 justify-between items-center item">
                    <div>
                        <h6 className="text-primary text-xl font-bold mb-3">E-Commerce Pharmacy & Shopping</h6>
                        <p className="text-gray-700">
                            Order pet medications, food, accessories, and more from our trusted online pharmacy and pet store, all delivered to your doorstep.
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image src="/images/dog-app-1.avif" alt="E-Commerce Pharmacy & Shopping" width={300} height={300} className="w-96" />
                    </div>
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-20 max-lg:gap-10 justify-between items-center item">
                    <div className="flex justify-center items-center max-lg:order-2">
                        <Image src="/images/dog-app-1.avif" alt="Pet Health Tracker" width={300} height={300} className="w-96" />
                    </div>
                    <div>
                        <h6 className="text-primary text-xl font-bold mb-3">Pet Health Tracker</h6>
                        <p className="text-gray-700">
                            Keep track of your pet’s medical records, vaccination schedules, and health progress with our intuitive pet health tracker.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-20 max-lg:gap-10 justify-between items-center item">
                    <div>
                        <h6 className="text-primary text-xl font-bold mb-3">AI-Powered Pet Syndrome Checker</h6>
                        <p className="text-gray-700">
                            Our advanced AI system analyzes symptoms and provides preliminary assessments to help you understand your pet’s health better.
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image src="/images/dog-app-1.avif" alt="AI-Powered Pet Syndrome Checker" width={300} height={300} className="w-96" />
                    </div>
                </div>
            </div>
            <div className="bg-primary w-full text-center py-14 px-5">
                <h2 className="text-3xl max-md:text-xl font-bold mb-3 text-white">Your Pet’s Health, Our Priority</h2>
                <p className="text-gray-300 mb-10 text-lg max-md:text-base">Join us in revolutionizing pet care with top-tier veterinary services, smart tools, and a seamless digital experience.</p>
                <button className="text-white  border rounded-full font-semibold px-7 py-3 text-center">Get Started Today</button>
            </div>
        </section>
    );
};

export default AllServicesSection;
