import Link from 'next/link';
import useCategories from '../../../../hooks/useCategories';
import { LuCat, LuDog, LuPill } from "react-icons/lu";

const ShopCategories = () => {
    const categories = useCategories();
    return (
        <div className='grid grid-cols-5 items-center gap-8 text-center'>
            {categories.map((category) => <Link href={{
                pathname: `shop/${category.category_slug}`,
                query: {
                    title: `${category.category_name.toLowerCase()}`
                }
            }} key={category.category_slug} className='border rounded-md w-44 hover:shadow-lg duration-200'>
                <div className='bg-gray-300 bg-opacity-10 flex items-center justify-center py-7'>
                    <LuDog className='text-5xl text-gray-800' />
                </div>
                <h3 className='py-5 font-semibold text-gray-900'>{category.category_name}</h3>
            </Link>
            )}
        </div>
    );
};

export default ShopCategories;
