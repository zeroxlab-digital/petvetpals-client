"use client";
import GetCategories from '@/utils/GetCategories';
import Image from 'next/image';
import Link from 'next/link';

const ShopCategories = () => {
    const categories = GetCategories();
    return (
        <div className='flex justify-between flex-wrap gap-5 text-center'>
            {categories.map((category) => <Link href={{
                pathname: `shop/${category.id}`,
                query: {
                    title: `${category.name}`
                }
            }} key={category.id} className='border rounded-md w-44 h-44 '>
                <div className='bg-gray-100 h-32 p-5 '>
                    <Image src={category.image} alt="category logo" width={300} height={200} />
                </div>
                <h3 className='mt-2 font-semibold'>{category.name}</h3>
            </Link>
            )}
        </div>
    );
};

export default ShopCategories;
