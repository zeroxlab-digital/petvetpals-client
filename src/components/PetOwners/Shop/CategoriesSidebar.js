"use client";
import GetCategories from "@/utils/GetCategories";
import Link from "next/link";
import { HiChevronRight, HiOutlineSquaresPlus, HiSquares2X2, HiSquaresPlus } from "react-icons/hi2";

const CategoriesSidebar = () => {
    const categories = GetCategories();
    console.log(categories)
    return (
        <aside className="">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-primary"><HiSquares2X2 className="font-bold text-xl" /> Shop By Category</h3>
            <ul>
                {categories.map(({ id, name }, index) => (
                    <Link
                        key={id}
                        href={{
                            pathname: `/shop/${id}`,
                            query: {
                                title: `${name}`,
                            },
                        }}
                    >
                        <li
                            className={` py-4 flex items-center justify-between border-b ${index === categories.length - 1 ? 'border-none' : ''
                                }`}
                        >
                            {name} <HiChevronRight />
                        </li>
                    </Link>
                ))}
            </ul>

        </aside>
    );
};

export default CategoriesSidebar;