import Image from 'next/image';
import Link from 'next/link';

const PetAccessories = ({ products, currentPathname }) => {
    const filteredProducts = products?.filter(product => product.category.category_slug === 'pet-accessories') || [];
    return (
        <div>
            <h2 className="text-lg font-semibold text-primary">Pet Accessories</h2>
            <div className="products mt-5 grid grid-cols-4 gap-5">
                {
                    filteredProducts.map(({ _id, name, price }) => <Link key={_id} href={{
                        pathname: `${currentPathname}/pet-accessories/${_id}`,
                        query: {
                            title: `${name.toLowerCase()}`
                        }
                    }} className="border rounded-md p-3">
                        <Image src="/images/pet-accessories2.avif" alt="product-image" width={300} height={200} className="mb-3" />
                        <h2 className="text-gray-700 hover:underline cursor-pointer mb-2">{name}</h2>
                        <h4 className="font-semibold text-gray-800">${price}</h4>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default PetAccessories;