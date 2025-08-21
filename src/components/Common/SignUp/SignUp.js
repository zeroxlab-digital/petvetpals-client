"use client";
import Link from "next/link";
import Input from "../Form/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import TinySpinner from "../Loader/TinySpinner";
import { useRegisterUserMutation } from "@/redux/services/userApi";
import { useRegisterVetMutation } from "@/redux/services/vetApi"; // <-- add this for vet
import { PawPrint, Stethoscope } from "lucide-react";
import PawBackground from "../PawBackground/PawBackground";

const SignUpPage = ({ mode }) => {
    console.log(mode)
    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1000 });
    };

    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [registerUser, { isLoading: userLoading, error: userError }] = useRegisterUserMutation();
    const [registerVet, { isLoading: vetLoading, error: vetError }] = useRegisterVetMutation();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            if (mode === "user") {
                const response = await registerUser(formData);
                console.log(response);
                if (response.data?.status === "success") {
                    notify("User registration successful! Please sign in.", "success");
                    router.push("/signin");
                }
            } else if (mode === "vet") {
                const response = await registerVet(formData);
                console.log(response);
                if (response.data) {
                    notify("Vet registration successful! Please sign in.", "success");
                    router.push("/veterinarian/signin");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative bg-pink-900 bg-opacity-5">
            <PawBackground />
            <div className="w-full sm:w-[21rem] max-md:px-7 text-center flex justify-center items-center h-screen mx-auto">
                <div className="w-full mx-auto">
                    <>
                        <h2 className="text-2xl font-bold text-primary mb-7 flex items-center justify-center">
                            {mode === "user" ? (
                                <>
                                    <PawPrint className="mr-3" /> Create Pawfile
                                </>
                            ) : (
                                <>
                                    <Stethoscope className="mr-3 text-blue-600" /> Create Pet
                                    <span className="text-blue-600">Vet</span>Pals
                                </>
                            )}
                        </h2>

                        <form onSubmit={handleRegistration} className="flex flex-col gap-3">
                            <Input
                                type="text"
                                placeholder="Full name"
                                name="fullName"
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                value={formData.fullName}
                                classNames={"bg-transparent text-gray-900 border-gray-300"}
                            />
                            <Input
                                type="email"
                                placeholder="Email address"
                                name="email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                value={formData.email}
                                classNames={"bg-transparent text-gray-900 border-gray-300"}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                value={formData.password}
                                classNames={"bg-transparent text-gray-900 border-gray-300"}
                            />
                            <Input
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                value={formData.confirmPassword}
                                classNames={"bg-transparent text-gray-900 border-gray-300"}
                            />

                            {(userError || vetError) && (
                                <p className="text-red-400">
                                    {(userError || vetError)?.data?.message}
                                </p>
                            )}

                            <button
                                type="submit"
                                className={`bg-primary hover:bg-primaryHover duration-200 p-3 rounded-full cursor-pointer text-white mt-5 ${
                                    (userError || vetError) && "!mt-0"
                                }`}
                            >
                                {userLoading || vetLoading ? <TinySpinner /> : "Sign Up"}
                            </button>
                        </form>

                        <div className="my-5">
                            <p className="text-sm text-gray-800">
                                Already have an account?{" "}
                                <Link
                                    href={mode === "user" ? "/signin" : "/veterinarian/signin"}
                                    className="text-primary"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </>

                    <div className="flex items-center justify-between gap-4">
                        <hr className="flex-grow border-t border-gray-600" />
                        <p className="text-sm text-gray-800">OR</p>
                        <hr className="flex-grow border-t border-gray-600" />
                    </div>

                    <div className="text-left flex flex-col gap-2 mt-5">
                        <button className="text-sm w-full hover:bg-[#e5e5e5a5] duration-200 text-gray-800 border border-gray-400 px-5 py-3 rounded-full flex items-center gap-3">
                            <Image src="/images/google.webp" alt="google-icon" width={20} height={20} /> Continue with Google
                        </button>
                        <button className="text-sm w-full hover:bg-[#e5e5e5a5] duration-200 text-gray-800 border border-gray-400 px-5 py-3 rounded-full flex items-center gap-3">
                            <Image src="/images/facebook-icon.png" alt="facebook-icon" width={20} height={20} /> Continue with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
