import axios from "axios";
import { useEffect, useState } from "react";

const useFetchPets = () => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const handleFetchPets = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/pet/get-pets`, {
                    withCredentials: true
                });
                if (res.status === 200) {
                    setPets(res.data?.pets);
                }
            } catch (error) {
                console.log(error);
                setError({ error: error.message })
            } finally {
                setIsLoading(false);
            }
        }
        handleFetchPets();
    }, [])
    return { pets, isLoading, error };
}
export default useFetchPets;