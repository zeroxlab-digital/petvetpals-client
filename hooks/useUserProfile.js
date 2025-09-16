import axios from "axios";
import { useState, useEffect } from "react";
import { useIsAuthenticated } from "./useIsAuthenticated";

const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, isLoading: authenticationLoading } = useIsAuthenticated();

    useEffect(() => {
        if (authenticationLoading) return;
        if (!isAuthenticated) {
            setUserProfile(null);
            return;
        }

        const handleFetchUserProfile = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/user/user-details`,
                    { withCredentials: true }
                );
                if (res.status === 200) {
                    setUserProfile(res.data.user);
                }
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        handleFetchUserProfile();
    }, [isAuthenticated, authenticationLoading]);

    return { userProfile, setUserProfile, loading, error };
};

export default useUserProfile;