import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetAppts = () => {
    const { authUser } = useSelector((state) => state.userRedu.user);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const handleFetchAppts = async () => {
            try {
                if (authUser) {
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/appointment/view-appointments`, {
                        withCredentials: true,
                    });
                    if (res.status === 200) {
                        setAppointments(res.data?.appointments);
                    }
                } else {
                    setAppointments([]);
                }
            } catch (error) {
                console.log(error)
                setError({ error: error.message })
            } finally {
                setIsLoading(false);
            }
        }
        handleFetchAppts();
    }, [authUser])
    return {appointments, isLoading, error};
}
export default useGetAppts;