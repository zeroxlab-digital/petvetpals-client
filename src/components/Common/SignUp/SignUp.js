"use client";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";

const SignUpPage = () => {
    const [user_type, set_user_type] = useState("petowner");
    return (
        <div className="w-80 text-center flex justify-center mx-auto my-20">
            <div className="w-full">
                <>
                    <h2 className="text-3xl font-semibold mb-10">Create an account</h2>
                    <form action="#" className="flex flex-col gap-3">
                        <input type="text" placeholder="Full name" className="border border-gray-400 p-3 rounded-md outline-[#58294E]" />
                        <input type="email" placeholder="Email address" className="border border-gray-400 p-3 rounded-md outline-[#58294E]" />
                        <input type="password" placeholder="Password" className="border border-gray-400 p-3 rounded-md outline-[#58294E]" />
                        <div className="flex items-center gap-2">
                        <input type="checkbox" id="veterinarian" />
                        <label for="veterinarian">Join as a veterinarian</label>
                        </div>
                        <input type="submit" value="Continue" className="bg-primary p-3 rounded-md cursor-pointer text-white mt-5" />
                    </form>
                    <div className="my-5">
                        <p>Already have an account? <Link href="/signin" className="text-primary">Sign In</Link></p>
                    </div>
                </>
                <div className="flex items-center justify-between">
                    <hr />
                    <p>OR</p>
                    <hr />
                </div>
                <div className="text-left flex flex-col gap-3 mt-5">
                    <button className="w-full hover:bg-[#e5e5e5d5] duration-200 text-gray-800 border border-gray-400 p-3 rounded-md  flex items-center gap-3"><FaGoogle /> Continue with Google</button>
                    <button className="w-full hover:bg-[#e5e5e5d5] duration-200 text-gray-800 border border-gray-400 p-3 rounded-md flex items-center gap-3"><FaFacebookF />Continue with Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;