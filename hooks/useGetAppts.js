import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetAppts = () => {
    const { authUser } = useSelector((state) => state.user);
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        const handleFetchAppts = async () => {
            try {
                if (authUser) {
                    const res = await axios.get(`https://petvetpals-server.onrender.com/api/appointment/view-appointments`, {
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
            }
        }
        handleFetchAppts();
    }, [authUser])
    return appointments;
}
export default useGetAppts;