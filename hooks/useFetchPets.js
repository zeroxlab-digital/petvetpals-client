import axios from "axios";
import { useEffect, useState } from "react";

const useFetchPets = () => {
    const [pets, setPets] = useState([]);
    useEffect(() => {
        const handleFetchPets = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/pet/get-pets", {
                    withCredentials: true
                });
                if (res.status === 200) {
                    setPets(res.data?.pets);
                }
            } catch (error) {
                console.log(error);
            }
        }
        handleFetchPets();
    }, [])
    return pets;
}
export default useFetchPets;