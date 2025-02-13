"use client";
import Link from "next/link";
import { HiChevronDoubleRight, HiChevronDown, HiChevronRight, HiSquares2X2 } from "react-icons/hi2";
import { LuCat, LuDog, LuPill } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useCategories from "../../../hooks/useCategories";

const CategoriesSidebar = () => {
    const categories = useCategories();
    const pathname = usePathname();
    const pathnameCategory = pathname.split('/').slice(0, 2).join('/');
    // const pathnameSlug = pathname.split('/').slice(2, 3).join('/');

    const [clickedCategory, setClickedCategory] = useState(null);
    // console.log(clickedCategory)
    const handleClickedCategory = (category) => {
        if (clickedCategory) {
            setClickedCategory(category);
        } else {
            setClickedCategory(category)
        }
    }
    return (
        <aside className="sticky top-28 h-fit overflow-auto max-lg:hidden col-span-1">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-primary"><HiSquares2X2 className="font-bold text-xl" /> {pathnameCategory === '/shop' ? 'Shop by category' : 'Online pet pharmacy'}</h3>
            <ul className="flex flex-col gap-3">
                {
                    categories.map((category, index) => <li key={index}>
                        <button onClick={() => handleClickedCategory(category)} key={category.category_slug} className=" w-full">
                            <div className={`flex items-center justify-between border-b py-4 ${category.category_slug === clickedCategory?.category_slug ? "text-primary font-semibold" : ""}`}>
                                <span className={`flex items-center gap-2 `}><LuDog className='text-xl text-gray-800' /> {category.category_name}</span>
                                {category.category_slug === clickedCategory?.category_slug ? <HiChevronDown /> : <HiChevronRight />}
                            </div>
                            {
                                clickedCategory && clickedCategory.category_slug === category.category_slug &&
                                <ul className="flex flex-col items-start">
                                    {
                                        clickedCategory?.sub_categories.map((sub_category, index) => <Link key={index} href={`/shop/${category.category_slug}${sub_category.slug ? `/${sub_category.slug}` : ''}`}
                                            className="w-full">
                                            <li className="flex items-center justify-between border-b py-4 hover:text-primary duration-150">
                                                <span className="flex items-center gap-2">
                                                    {sub_category.name}</span>
                                                <HiChevronRight />
                                            </li>
                                        </Link>)
                                    }
                                </ul>
                            }
                        </button>
                    </li>)
                }
            </ul>

        </aside >
    );
};

export default CategoriesSidebar;