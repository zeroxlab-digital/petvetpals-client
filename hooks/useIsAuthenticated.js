import { useGetUserDetailsQuery } from "@/redux/services/userApi";

export const useIsAuthenticated = () => {
    const { data, isLoading } = useGetUserDetailsQuery();
    return {
        isAuthenticated: Boolean(data?.success),
        isLoading,
    };
};
