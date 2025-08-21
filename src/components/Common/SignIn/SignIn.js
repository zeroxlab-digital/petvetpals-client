"use client";
import Link from "next/link";
import Input from "../Form/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import TinySpinner from "../Loader/TinySpinner";
import { useSignInUserMutation } from "@/redux/services/userApi";
import { PawPrint, Stethoscope } from "lucide-react";
import PawBackground from "../PawBackground/PawBackground";
import { useLoginVetMutation } from "@/redux/services/vetApi";

const SignInPage = ({ mode }) => {
    console.log(mode)
    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1000 });
    }
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [signInUser, { isLoading: userLoading, error: userError }] = useSignInUserMutation();
    const [loginVet, { isLoading: vetLoading, error: vetError }] = useLoginVetMutation();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'user') {
                const response = await signInUser(formData);
                console.log(response)
                if (response.data?.success === "true") {
                    notify("User login successfull!", "success");
                    router.push("/");
                }
            } else if (mode === 'vet') {
                const response = await loginVet(formData);
                console.log(response)
                if (response.data?.success) {
                    notify("Vet login successfull!", "success");
                    router.push("/veterinarian/dashboard");
                }
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
                        <h2 className="text-2xl font-bold text-primary mb-7 flex items-center justify-center">
                            {mode === 'user' ?
                                <><PawPrint className="mr-3" /> Login Pawfile</>
                                :
                                <><Stethoscope className="mr-3 text-blue-600" /> Login Pet<span className="text-blue-600">Vet</span>Pals</>
                            }
                        </h2>
                        <form onSubmit={handleLogin} action="#" className="flex flex-col gap-3">
                            <Input type="email" placeholder="Email address"
                                name="email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                value={formData.email}
                                classNames={"bg-transparent text-gray-900 border-gray-300"}
                            />
                            <Input type="password" placeholder="Password"
                                name="password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                value={formData.password}
                                classNames={"bg-transparent text-gray-900 border-gray-300"}
                            />
                            <div className="flex">
                                <Link className="text-sm text-gray-800" href="/forgot-password">Forgot password?</Link>
                            </div>
                            {(userError || vetError) && <p className="text-red-400">{(userError || vetError).data?.message}</p>}
                            <button type="submit" className={`bg-primary hover:bg-primaryHover duration-200 p-3 rounded-full cursor-pointer text-white mt-5 ${(userError || vetError) && '!mt-0'}`}>{userLoading || vetLoading ? <TinySpinner /> : 'Sign In'}</button>
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