"use client";
import Image from 'next/image';
import Link from 'next/link';
import GetCategories from '@/utils/GetCategories';

const ShopCategories = () => {
    const categories = GetCategories();
    return (
        <div className='flex justify-between flex-wrap gap-5 text-center'>
            {categories.map((category) => <Link href={{
                pathname: `shop/${category.category_slug}`,
                query: {
                    // title: `${category.category_name}`
                }
            }} key={category.category_slug} className='border rounded-md w-44 h-44 '>
                <div className='bg-gray-100 h-32 p-5 '>
                    <Image src={category.category_image} alt="category image" width={300} height={200} />
                </div>
                <h3 className='mt-2 font-semibold'>{category.category_name}</h3>
            </Link>
            )}
        </div>
    );
};

export default ShopCategories;
