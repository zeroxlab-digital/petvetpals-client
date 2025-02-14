import Button from '@/components/Common/Button/Button';
import Image from 'next/image';
import React from 'react';

const BestDealSection = () => {
    return (
        <section className='bg-primary max-md:py-7'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 items-center px-5 md:px-0'>
                {/* Left Image */}
                <div className="relative order-1 md:order-1 flex justify-center">
                    <div
                        className="absolute inset-0 bg-yellow-300"
                        style={{
                            clipPath: "polygon(0% 0%, 100% 100%, 100% 100%, 0% 100%)"
                        }}
                    />
                    <Image
                        src="/images/black-dog.webp"
                        alt="pet"
                        height={400}
                        width={400}
                        className="relative w-48 md:w-72"
                    />
                </div>

                {/* Center Content */}
                <div
                    className='text-center flex flex-col items-center order-3 md:order-2'
                    style={{
                        backgroundImage: `url('/images/paw-heart.webp')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                    }}
                >
                    <p className='uppercase text-yellow-300 text-sm md:text-lg'>Save 50% off</p>
                    <h4 className='font-semibold text-2xl md:text-4xl text-white mb-2 mt-4'>Best Deal Offer</h4>
                    <p className='text-gray-200 text-sm md:text-base mb-8 md:mb-14 px-5 md:px-0'>
                        Grab the best deals from PetVetPals Grab the best deals from PetVetPals Grab the best deals from PetVetPals
                    </p>
                    <Button classNames={"bg-yellow-300 rounded-full font-semibold"} size={"medium"}>Shop Now</Button>
                </div>

                {/* Right Image */}
                <div className="relative order-2 md:order-3 flex justify-center">
                    <div
                        className="absolute inset-0 bg-yellow-300"
                        style={{
                            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 0% 100%)"
                        }}
                    />
                    <Image
                        src="/images/cat-dog.webp"
                        alt="pet"
                        height={400}
                        width={400}
                        className="relative w-64 md:w-[24.35rem]"
                    />
                </div>
            </div>
        </section>
    );
};

export default BestDealSection;