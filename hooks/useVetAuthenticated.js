import { useGetVetProfileQuery } from "@/redux/services/vetApi";

export const useVetAuthenticated = () => {
    const { data, isLoading } = useGetVetProfileQuery();
    return {
        isAuthenticated: Boolean(data?.success),
        isLoading
    }
}