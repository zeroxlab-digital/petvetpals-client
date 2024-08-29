"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ShopItemsPage = ({ params }) => {
    const id = params.category;
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch('/data/products.json');
            const data = await res.json();
            const filteredCategory = data.categories.find(item => item.id === Number(id))
            setItems(filteredCategory);
        };
        fetchItems();
    }, [id]);

    const currentPathname = usePathname();

    return (
        <div>
            <h2 className="text-lg font-semibold text-primary">{items.name}</h2>
            <div className="items mt-5 grid grid-cols-4 gap-5">
                {items?.items?.map(item => <Link href={{
                    pathname: `${currentPathname}/${item.id}`,
                    query: {
                        title: `${item.name}`
                    }
                }} key={item.id} className="border rounded-md p-3">
                    <Image src="/images/pet-accessories2.avif" alt="product-image" width={300} height={200} className="mb-3" />
                    <h2 className="text-gray-700 hover:underline cursor-pointer mb-2">{item.name}</h2>
                    <h4 className="font-semibold text-gray-800">${item.price}</h4>
                </Link>)}
            </div>
        </div>
    );
};

export default ShopItemsPage;