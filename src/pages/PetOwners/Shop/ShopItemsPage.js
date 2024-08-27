"use client";
import { useEffect, useState } from "react";

const ShopItemsPage = ({ params }) => {
    const id = params.id;
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
    console.log(items.items);
    return (
        <div>
            <h2>{items.name}</h2>
            <div className="items mt-5">
                {items?.items?.map(item => <div key={item.id} className="border p-5 mb-2">
                    <h2>{item.name}</h2>
                    <h4>${item.price}</h4>
                </div>)}
            </div>
        </div>
    );
};

export default ShopItemsPage;