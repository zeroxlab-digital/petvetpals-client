import { useGetUserDetailsQuery } from "@/redux/services/userApi";

export const useUserAuthenticated = () => {
    const { data, isLoading } = useGetUserDetailsQuery();
    return {
        isAuthenticated: Boolean(data?.success),
        isLoading,
    };
};
