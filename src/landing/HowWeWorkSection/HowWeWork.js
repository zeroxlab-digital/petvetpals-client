import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HowWeWork = () => {
    return (
        <section className='pb-16 md:pb-32'>
            <div className='app-container'>
                <div className='text-center mb-10 md:mb-20'>
                    <h3 className='text-xl md:text-2xl text-gray-900'>Care that puts your pet at the center</h3>
                    <p className='text-gray-800 mt-3 text-sm md:text-base'>
                        PetVetPals focuses on providing pets with continuous care for longer, healthier lives
                    </p>
                </div>
                <div className='flex flex-col md:flex-row gap-5 md:gap-16 justify-center items-center'>
                    <Image
                        src="/images/vet-chat.png"
                        alt="vet"
                        width={300}
                        height={200}
                        className='w-full md:w-auto h-auto'
                    />
                    <Image
                        src="/images/vet-video.webp"
                        alt="vet"
                        width={300}
                        height={300}
                        className='w-full md:w-auto h-auto'
                    />
                    <Image
                        src="/images/vet-result.png"
                        alt="vet"
                        width={300}
                        height={200}
                        className='w-full md:w-auto h-auto max-lg:hidden'
                    />
                </div>
            </div>
            <button className='bg-primary p-3 w-full text-white text-sm md:text-base underline mt-10 md:mt-16'>
                <Link href="">Learn More About How It Works</Link>
            </button>
        </section>
    );
};

export default HowWeWork;