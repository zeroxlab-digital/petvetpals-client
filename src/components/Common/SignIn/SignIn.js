"use client";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import Input from "../Form/Input";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {
    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1000 });
    }
    const router = useRouter();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleUserLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/login`, user, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (response.status === 200) {
                dispatch(setAuthUser(response?.data?.userDetails));
                notify("User login successfull!", "success");
                router.push("/");
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
                    <h2 className="text-2xl font-bold text-primary mb-10">Welcome back</h2>
                    <form onSubmit={handleUserLogin} action="#" className="flex flex-col gap-3">
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
                        <div className="flex">
                            <Link className="text-primary" href="">Forgot password?</Link>
                        </div>
                        {error && <p className="text-red-400">{error}</p>}
                        <button type="submit" className={`bg-primary p-3 rounded-md cursor-pointer text-white mt-5 ${error && '!mt-0'}`}>{isLoading ? 'Loading...' : 'Sign In'}</button>
                    </form>
                    <div className="my-5">
                        <p>Dont have an account? <Link href="/signup" className="text-primary">Sign Up</Link></p>
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

export default SignInPage;