import Link from 'next/link';
import React from 'react';

const ShopCategories = ({ type }) => {
    const dogCategories = [
        { title: "Shop all", image: "", link: "shop-all" },
        { title: "Dog food", image: "", link: "foods" },
        { title: "Dog treats", image: "", link: "treats" },
        { title: "Dog supplies", image: "", link: "supplies" },
    ]
    const catCategories = [
        { title: "Shop all", image: "", link: "shop-all" },
        { title: "Cat food & treats", image: "", link: "foods-and-treats" },
        { title: "Accessories and supplies", image: "", link: "accessories-and-supplies" },
    ]
    return (
        <>
            {
                type === "dog-deals" ?
                    <div className='flex gap-5 flex-wrap'>
                        {
                            dogCategories.map((category, index) => <Link key={index} href={`${type}/${category.link}`} className='w-32 h-32 p-3 flex justify-center items-center rounded-full border text-center'>
                                <h3>{category.title}</h3>
                            </Link>)
                        }
                    </div>
                    :
                    <div className='flex gap-5 flex-wrap'>
                        {
                            catCategories.map((category, index) => <Link key={index} href={`${type}/${category.link}`} className='w-32 h-32 p-3 flex justify-center items-center rounded-full border text-center'>
                                <h3>{category.title}</h3>
                            </Link>)
                        }
                    </div>
            }
        </>
    );
};

export default ShopCategories;