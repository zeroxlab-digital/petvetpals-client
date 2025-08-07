"use client";
import Link from "next/link";
import Input from "../Form/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import TinySpinner from "../Loader/TinySpinner";
import { useSignInUserMutation } from "@/redux/services/userApi";
import { PawPrint } from "lucide-react";
import PawBackground from "../PawBackground/PawBackground";

const SignInPage = () => {
    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1000 });
    }
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [signInUser, { isLoading, error }] = useSignInUserMutation();
    const handleUserLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await signInUser(user);
            console.log(response)
            if (response.data?.success === "true") {
                notify("User login successfull!", "success");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="relative bg-pink-900 bg-opacity-5">
            <PawBackground />
            <div className="w-full sm:w-[21rem] max-md:px-7 text-center flex justify-center items-center h-screen mx-auto ">
                <div className="w-full mx-auto">
                    <>
                        <h2 className="text-[22px] font-bold text-primary mb-7 flex items-center gap-3 justify-center uppercase"><PawPrint /> Login Pawfile</h2>
                        <form onSubmit={handleUserLogin} action="#" className="flex flex-col gap-3">
                            <Input type="email" placeholder="Email address"
                                name="email"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                value={user.email}
                                classNames={"bg-transparent text-gray-900 border-gray-300"}
                            />
                            <Input type="password" placeholder="Password"
                                name="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                value={user.password}
                                classNames={"bg-transparent text-gray-900 border-gray-300"}
                            />
                            <div className="flex">
                                <Link className="text-sm text-gray-800" href="/forgot-password">Forgot password?</Link>
                            </div>
                            {error && <p className="text-red-400">{error.data?.message}</p>}
                            <button type="submit" className={`bg-primary hover:bg-primaryHover duration-200 p-3 rounded-full cursor-pointer text-white mt-5 ${error && '!mt-0'}`}>{isLoading ? <TinySpinner /> : 'Sign In'}</button>
                        </form>
                        <div className="my-5">
                            <p className="text-sm text-gray-800">Dont have an account? <Link href="/signup" className="text-primary">Sign Up</Link></p>
                        </div>
                    </>
                    <div className="flex items-center justify-between gap-4">
                        <hr className="flex-grow border-t border-gray-600" />
                        <p className="text-sm text-gray-800">OR</p>
                        <hr className="flex-grow border-t border-gray-600" />
                    </div>
                    <div className="text-left flex flex-col gap-2 mt-5">
                        <button className="text-sm w-full hover:bg-[#e5e5e5a5] duration-200 text-gray-800 border border-gray-400 px-5 py-3 rounded-full  flex items-center gap-3"><Image src="/images/google.webp" alt="google-icon" width={20} height={20} /> Continue with Google</button>
                        <button className="text-sm w-full hover:bg-[#e5e5e5a5] duration-200 text-gray-800 border border-gray-400 px-5 py-3 rounded-full flex items-center gap-3"><Image src="/images/facebook-icon.png" alt="google-icon" width={20} height={20} /> Continue with Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;