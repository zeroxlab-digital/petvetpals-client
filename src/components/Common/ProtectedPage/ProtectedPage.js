import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserAuthenticated } from '../../../../hooks/useUserAuthenticated';
import { useVetAuthenticated } from '../../../../hooks/useVetAuthenticated';

const ProtectedPage = (Component, role = "any") => {
    return function ProtectedComponent(props) {
        const router = useRouter();
        const { isAuthenticated: userAuthenticated, isLoading: userLoading } = useUserAuthenticated();
        const { isAuthenticated: vetAuthenticated, isLoading: vetLoading } = useVetAuthenticated();

        const isLoading = userLoading || vetLoading;
        let isAuthenticated = false;

        if(role === "user") isAuthenticated = userAuthenticated;
        else if(role === "vet") isAuthenticated = vetAuthenticated;

        useEffect(() => {
            if (!isLoading && !isAuthenticated) {
                router.push("/signin");
            }
        }, [isAuthenticated, isLoading]);

        if (isLoading) return null; // or a loading spinner
        if (!isAuthenticated) return null;

        return <Component {...props} />;
    };
};

export default ProtectedPage;
