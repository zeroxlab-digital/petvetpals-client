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
    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            console.log(user);
            const response = await axios.post(`http://localhost:8000/api/user/register`, user , {
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
        }
    }

    return (
        <div className="max-w-96 text-center flex justify-center mx-auto my-20 p-3">
            <div className="w-full">
                <>
                    <h2 className="text-3xl font-semibold mb-10">Create an account</h2>
                    <form onSubmit={handleRegistration} action="#" className="flex flex-col gap-3">
                        <Input type="text" placeholder="Enter fullname"
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
                        <button type="submit" className="bg-primary p-3 rounded-md cursor-pointer text-white mt-5">Submit</button>
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