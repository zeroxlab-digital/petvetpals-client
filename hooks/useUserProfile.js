import axios from "axios";
import { useState, useEffect } from "react";

const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const handleFetchUserProfile = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/user-details`, {
                    withCredentials: true
                })
                if(res.status === 200) {
                    setUserProfile(res.data.user);
                }
            } catch (error) {
                console.log(error.message)
                setError(error.message)
            } finally {
                setLoading(false);
            }
        }
        handleFetchUserProfile();
    }, [])
    return { userProfile, setUserProfile, loading, error }
}
export default useUserProfile;