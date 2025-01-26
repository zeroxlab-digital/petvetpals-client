"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetchVets = () => {
    const [vets, setVets] = useState([]);
    useEffect(() => {
        const handleFetchVets = async () => {
            const res = await axios.get(`http://localhost:8000/api/vet/all-vets`);
            if(res.status === 200) {
                setVets(res.data.vets)
            }
        };
        handleFetchVets();
    }, [])
    return vets;;
}

export default useFetchVets;