import axios from "axios";
import { useEffect } from "react";

const useBookAppt = () => {
    useEffect(() => {
        const handleBookAppt = async () => {
            const res = await axios.post(`http://localhost:8000/api/appointment/book-appointment/67913ae9c54c0d9056fbd1f6`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })
            console.log(res);
        }
        handleBookAppt();
    }, [])
}
export default useBookAppt;