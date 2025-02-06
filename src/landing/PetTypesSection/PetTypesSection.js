import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PetTypesSection = () => {
    const types = [
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Pharmacy", image: "/images/pharmacy.avif", link: "/shop/dog-deals" },
    ]
    return (
        <section className='py-32'>
            <div className='app-container'>
                <div className='text-center mb-20 lg:w-3/6 mx-auto'>
                    <h3 className='text-2xl text-gray-900'>Shop By Pet Type</h3>
                    <p className='text-gray-800 mt-3'>With a focuse on providing pets with continuous care for longer, healthier lives we have the best deals for you</p>
                </div>
                <div className='flex items-center justify-between flex-wrap'>
                    {
                        types.map((type, index) => (
                            <Link key={index} href={type.link}>
                                <div className='text-center group '>
                                    <Image src={type.image} alt="type-img" width={130} height={130} className='group-hover:shadow-lg rounded-full duration-200' />
                                    <p className='mt-2 text-gray-800 group-hover:underline duration-200'>{type.title}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default PetTypesSection;