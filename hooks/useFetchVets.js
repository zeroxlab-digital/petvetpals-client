"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetchVets = () => {
    const [vets, setVets] = useState([]);
    useEffect(() => {
        const handleFetchVets = async () => {
            const res = await axios.get(`https://petvetpals-server.onrender.com/api/vet/all-vets`);
            if(res.status === 200) {
                setVets(res.data.vets)
            }
        };
        handleFetchVets();
    }, [])
    return vets;;
}

export default useFetchVets;