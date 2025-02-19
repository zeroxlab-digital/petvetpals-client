"use client";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import Input from "../Form/Input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleRegistration = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log(user);
            const response = await axios.post(`https://petvetpals-server.onrender.com/api/user/register`, user , {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.status === 200) {
                alert("User registration successfull! Please log in.");
                router.push("/signin");
            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message)
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-96 text-center flex justify-center items-center h-screen mx-auto p-3">
            <div className="w-full">
                <>
                    <h2 className="text-2xl font-bold text-primary mb-10">Create an account</h2>
                    <form onSubmit={handleRegistration} action="#" className="flex flex-col gap-3">
                        <Input type="text" placeholder="Enter Full Name"
                            name="fullname"
                            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                            value={user.fullName}
                        />
                        <Input type="email" placeholder="Email Address"
                            name="email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                        />
                        <Input type="password" placeholder="Password"
                            name="password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                        />
                        <Input type="password" placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            value={user.confirmPassword}
                        />
                        {error && <p className="text-red-400">{error}</p>}
                        <button type="submit" className={`bg-primary p-3 rounded-md cursor-pointer text-white mt-5 ${error && '!mt-0'}`}>{isLoading ? 'Loading...' : 'Sign Up'}</button>
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
                <div className="text-left flex flex-col gap-2 mt-5">
                    <button className="w-full hover:bg-[#e5e5e5d5] duration-200 text-gray-800 border border-gray-400 p-2 rounded-md  flex items-center gap-2"><FaGoogle /> Google Sign-in</button>
                    <button className="w-full hover:bg-[#e5e5e5d5] duration-200 text-gray-800 border border-gray-400 p-2 rounded-md flex items-center gap-2"><FaFacebookF /> Facebook Sign-in</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;