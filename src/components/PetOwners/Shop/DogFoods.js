import { HiArrowRight } from 'react-icons/hi2';
import Products from './Products';
import Link from 'next/link';

const DogFoods = ({ products, currentPathname }) => {
    const filteredProducts = products?.filter(product => product.category.category_slug === 'dog-foods') || [];
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-black">Dog Foods</h2>
                <Link href={`shop/dog-foods`} className="text-primary flex items-center gap-2 font-[500]">View More <HiArrowRight /></Link>
            </div>
            <div className="products mt-5 grid grid-cols-4 gap-5">
                {
                    filteredProducts.map(({ _id, name, price }) => <div key={_id} className="border rounded-md p-3">
                        <Products _id={_id} name={name} price={price} currentPathname={currentPathname} />
                    </div>)
                }
            </div>
        </div>
    );
};

export default DogFoods;