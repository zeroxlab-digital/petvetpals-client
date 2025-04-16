import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useIsAuthenticated } from '../../../../hooks/useIsAuthenticated';

const ProtectedPage = (Component) => {
    return function ProtectedComponent(props) {
        const router = useRouter();
        const { isAuthenticated, isLoading } = useIsAuthenticated();

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
