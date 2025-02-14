"use client";
import Link from "next/link";
import { HiChevronDown, HiChevronRight, HiSquares2X2 } from "react-icons/hi2";
import { LuDog } from "react-icons/lu";
import { usePathname } from "next/navigation";
import useCategories from "../../../hooks/useCategories";

const CategoriesSidebar = () => {
    const categories = useCategories();
    const pathname = usePathname();
    const pathnameCategory = pathname.split('/').slice(0, 2).join('/');

    return (
        <aside className="sticky top-28 h-fit overflow-auto max-lg:hidden col-span-1">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-primary">
                <HiSquares2X2 className="font-bold text-xl" />
                {pathnameCategory === '/shop' ? 'Shop by category' : 'Online pet pharmacy'}
            </h3>
            <ul className="flex flex-col gap-3">
                {categories.map((category, index) => (
                    <li key={index}>
                        <div className="flex items-center justify-between border-b  py-4">
                            <div className="flex items-center justify-between w-full">
                                <span className="flex items-center gap-2">
                                    <LuDog className='text-xl text-gray-800' />
                                    {category.category_name}
                                </span>
                                <HiChevronDown />
                            </div>
                        </div>
                        <ul className="flex flex-col items-start">
                            {category.sub_categories.map((sub_category, subIndex) => (
                                <Link
                                    key={subIndex}
                                    href={`/${pathnameCategory === '/shop' ? 'shop' : 'pharmacy'}/${category.category_slug}${sub_category.slug ? `/${sub_category.slug}` : ''}`}
                                    className="w-full"
                                >
                                    <li className="flex items-center justify-between border-b py-4 hover:text-primary duration-150">
                                        <span className="flex items-center gap-2">
                                            {sub_category.name}
                                        </span>
                                        <HiChevronRight />
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default CategoriesSidebar;
