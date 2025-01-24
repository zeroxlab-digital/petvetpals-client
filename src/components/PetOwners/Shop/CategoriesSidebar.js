"use client";
import Link from "next/link";
import { HiChevronDoubleRight, HiChevronRight, HiSquares2X2 } from "react-icons/hi2";
import useCategories from "../../../../hooks/useCategories";
import { LuCat, LuDog, LuPill } from "react-icons/lu";
import { usePathname } from "next/navigation";

const CategoriesSidebar = () => {
    const categories = useCategories();
    const pathname = usePathname();
    const pathnameCategory = pathname.split('/').slice(0, 2).join('/');
    const pathnameSlug = pathname.split('/').slice(2, 3).join('/');
    return (
        <aside className="sticky top-28 h-fit overflow-auto max-xl:hidden">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-primary"><HiSquares2X2 className="font-bold text-xl" /> {pathnameCategory === '/shop' ? 'Shop by category' : 'Online pet pharmacy'}</h3>
            <ul>
                {categories.map(({ category_slug, category_name, category_image }, index) => (
                    <Link
                        key={category_slug}
                        href={{
                            pathname: `${pathnameCategory}/${category_slug}`,
                            query: {
                                title: `${category_name.toLowerCase()}`,
                            },
                        }}
                    >
                        <li
                            className={`${pathnameSlug == category_slug ? 'text-primary' : 'text-black'} py-5 flex items-center justify-between border-b ${index === categories.length - 1 ? 'border-none' : ''
                                }`}
                        >
                            <div className="flex items-center gap-2"><LuDog className='text-xl text-gray-800' /> {category_name}</div> {pathnameSlug == category_slug ? <HiChevronDoubleRight /> : <HiChevronRight />}
                        </li>
                    </Link>
                ))}
            </ul>

        </aside>
    );
};

export default CategoriesSidebar;