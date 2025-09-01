import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HowWeWork = () => {
    return (
        <section className=''>
            <div className='app-container'>
                <div className='text-center mb-5 md:mb-10'>
                    <h3 className='text-2xl text-gray-900'>Care That Puts Your Pet at the Center</h3>
                    <p className='text-gray-800 mt-3 text-sm md:text-base'>
                        PetVetPals focuses on providing pets with continuous care for longer, healthier lives
                    </p>
                </div>
                <div className='flex justify-center w-full'>
                    <Image
                        src="/images/petvetpals-call.png"
                        alt="vet call"
                        width={800}
                        height={800}
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="h-auto rounded-2xl"
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