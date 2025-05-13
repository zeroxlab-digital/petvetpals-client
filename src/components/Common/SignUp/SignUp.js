"use client";
import Link from "next/link";
import Input from "../Form/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import TinySpinner from "../Loader/TinySpinner";
import { useRegisterUserMutation } from "@/redux/services/userApi";

const SignUpPage = () => {
    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1000 });
    }
    const router = useRouter()
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(user);
            console.log(response);
            if (response.data?.status === "success") {
                notify("User registration successful! Please sign in.", "success");
                router.push("/signin");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full sm:w-[22rem] max-md:px-7 text-center flex justify-center items-center h-screen mx-auto">
            <div className="w-full">
                <>
                    <h2 className="text-2xl font-bold text-primary mb-7">Create an Account</h2>
                    <form onSubmit={handleRegistration} action="#" className="flex flex-col gap-3">
                        <Input type="text" placeholder="Enter full name"
                            name="fullname"
                            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                            value={user.fullName}
                        />
                        <Input type="email" placeholder="Email address"
                            name="email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                        />
                        <Input type="password" placeholder="Password"
                            name="password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                        />
                        <Input type="password" placeholder="Confirm password"
                            name="confirmPassword"
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            value={user.confirmPassword}
                        />
                        {error && <p className="text-red-400">{error?.data?.message}</p>}
                        <button type="submit" className={`bg-primary p-3 rounded-md cursor-pointer text-white mt-5 ${error && '!mt-0'}`}>{isLoading ? <TinySpinner /> : 'Sign Up'}</button>
                    </form>
                    <div className="my-5">
                        <p className="text-sm">Already have an account? <Link href="/signin" className="text-primary">Sign In</Link></p>
                    </div>
                </>
                <div className="flex items-center justify-between gap-4">
                    <hr className="flex-grow border-t border-gray-600" />
                    <p className="text-sm text-gray-700">OR</p>
                    <hr className="flex-grow border-t border-gray-600" />
                </div>
                <div className="text-left flex flex-col gap-2 mt-5">
                    <button className="w-full hover:bg-[#e5e5e5a5] duration-200 text-gray-800 border border-gray-400 p-3 rounded-md  flex items-center gap-3"><Image src="/images/google.webp" alt="google-icon" width={20} height={20} /> Continue with Google</button>
                    <button className="w-full hover:bg-[#e5e5e5a5] duration-200 text-gray-800 border border-gray-400 p-3 rounded-md flex items-center gap-3"><Image src="/images/facebook-icon.png" alt="google-icon" width={20} height={20} /> Continue with Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;