"use client";

import { useEffect, useState } from "react";

const useVets = () => {
    const [vets, setVets] = useState([]);
    useEffect(() => {
        const handleFetchVets = async () => {
            const res = await fetch('/data/vets.json');
            const data = await res.json();
            setVets(data);
        }
        handleFetchVets();
    }, [])
    return vets;
}
export default useVets;