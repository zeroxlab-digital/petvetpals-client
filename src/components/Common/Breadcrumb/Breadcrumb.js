"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathnameSlugs = pathname.split("/").filter(slug => slug);
    return (
        <nav className="text-gray-600 text-sm font-medium">
            <ul className="flex uppercase">
                <li>
                    <Link href="/" className="hover:text-blue-500 duration-100">home</Link>
                </li>
                {pathnameSlugs.map((slug, index) => {
                    const routeTo = "/" + pathnameSlugs.slice(0, index + 1).join("/");
                    const isLast = index === pathnameSlugs.length - 1;

                    return (
                        <li key={routeTo} className="flex items-center">
                            <span className="mx-2">/</span>
                            {isLast ? (
                                <span className="text-gray-700">{decodeURIComponent(slug)}</span>
                            ) : (
                                <Link href={routeTo} className="hover:text-blue-500 duration-100">
                                    {decodeURIComponent(slug)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
