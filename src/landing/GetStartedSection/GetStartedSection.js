"use client";
import Button from '@/components/Common/Button/Button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiArrowSmRight } from 'react-icons/hi';
import { HiCheckCircle } from 'react-icons/hi2';

const GetStartedSection = () => {
    const router = useRouter();
    return (
        <section className='app-container md:w-3/4 mx-auto pt-20 my-10'>
            <div className=' text-center bg-opacity-20 rounded-xl w-full h-auto flex flex-col items-center px-5 py-14 max-sm:py-7'
                style={{
                    backgroundImage: 'url(/images/doggies-banner.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}>
                <h4 className='uppercase font-semibold text-sm text-white'>Get started with PetVetPals Today!</h4>
                <h1 className='text-primary font-bold text-3xl my-5'>Give Your Animal the Best Care</h1>
                <p className='text-primary mb-10 md:w-3/5 mx-auto'>
                    Sign up now to start chatting with our virtual assistants and get personalized advice for your animals health and wellness.
                </p>
                <Button variant={"primary"} size={"large"} onClick={() => router.push("/appointments")} classNames={" rounded-lg text-white w-[12rem] !h-11 font-bold"}>See a Vet <HiArrowSmRight className='text-xl' /></Button>
                <ul className='flex items-center gap-7 mt-10'>
                    <li className='flex items-center gap-1 text-gray-600 text-sm'><HiCheckCircle className='text-green-300' /> Fast & convenient</li>
                    <li className='flex items-center gap-1 text-gray-600 text-sm'><HiCheckCircle className='text-green-300' /> 24/7 services</li>
                </ul>
            </div>
        </section>
    );
};

export default GetStartedSection;