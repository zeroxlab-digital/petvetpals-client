"use client";
import Button from '@/components/Common/Button/Button';
import './HeroSection.css'

const HeroSection = () => {
    return (
        <div className="px-32 hero-section relative mt-44">
            {/* <div className="video-container">
                <video autoPlay loop preload="none" muted>
                    <source src="/videos/hero-video.mp4" type="video/mp4" />
                </video>
            </div> */}
            <div className="content-wrapper text-center">
                <h2 className="leading-tight font-extrabold text-5xl  mb-5">
                    Online <span className="text-primary">Vet Care,</span> Products & <span className="text-primary">Prescriptions</span> Whenever You Need
                </h2>
                <p className=" text-lg">
                    Meet with a top-rated online vet to get customized prescription treatment plans to solve your pets needs
                </p>
                <div className='mt-10 flex items-center gap-5 justify-center'>
                    <Button variant="primary" size="large" uppercase={true}>Get Appointments</Button>
                    <Button variant="primaryOutline" size="large" uppercase={true} classNames={"!text-primary"}>Buy Pet Products</Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
