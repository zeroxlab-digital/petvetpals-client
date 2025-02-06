import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HowWeWork = () => {

    return (
        <section className='py-32'>
            <div className='app-container '>
                <div className='text-center mb-20'>
                    <h3 className='text-2xl text-gray-900'>Care that puts your pet at the center</h3>
                    <p className='text-gray-800 mt-3'>PetVetPals focuses on providing pets with continuous care for longer, healthier lives</p>
                </div>
                <div className='flex gap-16 justify-center'>
                    <Image src="/images/vet-chat.png" alt="vet" width={300} height={200} className='' />
                    <Image src="/images/vet-video.webp" alt="vet" width={300} height={300} className='' />
                    <Image src="/images/vet-result.png" alt="vet" width={300} height={200} className='' />
                </div>
            </div>
            <button className='bg-primary p-3 w-full text-white text-base underline'><Link href="">Learn More About How It Works</Link></button>
        </section>
    );
};

export default HowWeWork;