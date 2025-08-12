import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HowWeWork = () => {
    return (
        <section className='pb-16 md:pb-32'>
            <div className='app-container'>
                <div className='text-center mb-10 md:mb-20'>
                    <h3 className='text-2xl text-gray-900'>Care That Puts Your Pet at the Center</h3>
                    <p className='text-gray-800 mt-3 text-sm md:text-base'>
                        PetVetPals focuses on providing pets with continuous care for longer, healthier lives
                    </p>
                </div>
                <div className='flex flex-col md:flex-row gap-5 md:gap-16 justify-center '>
                    <Image
                        src="/images/vet-chat.png"
                        alt="vet"
                        width={300}
                        height={200}
                        className='w-full max-md:order-2 max-sm:hidden'
                    />
                    <Image
                        src="/images/vet-video.webp"
                        alt="vet"
                        width={300}
                        height={300}
                        className='w-full  max-md:order-1'
                    />
                    <Image
                        src="/images/vet-result.png"
                        alt="vet"
                        width={300}
                        height={200}
                        className='w-full  max-lg:hidden'
                    />
                </div>
            </div>
            <button className='bg-primary p-3 w-full text-white text-sm md:text-base underline '>
                <Link href="">Learn More About How It Works</Link>
            </button>
        </section>
    );
};

export default HowWeWork;