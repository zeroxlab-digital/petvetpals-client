import Button from '@/components/Common/Button/Button';
import Image from 'next/image';
import React from 'react';

const BestDealSection = () => {
    return (
        <section className='bg-primary'>
            <div className='grid grid-cols-3 gap-5 items-center'>
                <div
                    className="relative"
                >
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
                        className="relative w-72"
                    />
                </div>
                <div className='text-center flex flex-col items-center'
                    style={{
                        backgroundImage: `url('/images/paw-heart.webp')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                    }}>
                    <p className='uppercase text-yellow-300 text-lg'>Save 50% off</p>
                    <h4 className='font-semibold text-4xl text-white mb-2 mt-4'>Best Deal Offer</h4>
                    <p className='text-gray-200 mb-14'>Grab the best deals from PetVetPals Grab the best deals from PetVetPals Grab the best deals from PetVetPals</p>
                    <Button classNames={"bg-yellow-300 rounded-full font-semibold"} size={"medium"}>Shop Now</Button>
                </div>
                <div
                    className="relative"
                >
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
                        className="relative w-96"
                    />
                </div>
            </div>
        </section>
    );
};

export default BestDealSection;