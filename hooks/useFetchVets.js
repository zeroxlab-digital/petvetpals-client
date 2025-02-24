"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetchVets = () => {
    const [vets, setVets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const handleFetchVets = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/vet/all-vets`);
            if (res.status === 200) {
                setVets(res.data.vets)
                setIsLoading(false);
            } else {
                setError(true);
            }
        };
        handleFetchVets();
    }, [])
    return { vets, isLoading, error };;
}

export default useFetchVets;