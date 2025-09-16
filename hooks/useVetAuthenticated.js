import { useGetVetProfileQuery } from "@/redux/services/vetApi";
import { usePathname } from "next/navigation";

export const useVetAuthenticated = () => {
    const pathname = usePathname();
    const shouldFetch = pathname.startsWith("/veterinarian");
    const { data, isLoading } = useGetVetProfileQuery(undefined, { skip: !shouldFetch });
    return {
        isAuthenticated: Boolean(data?.success),
        isLoading
    }
}