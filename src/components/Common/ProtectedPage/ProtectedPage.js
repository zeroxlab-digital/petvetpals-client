import { useUserSession } from '@/utils/userSession';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// HoC - Higher order Component
const ProtectedPage = (Component) => {
    return function ProtectedComponent(props) {
        const router = useRouter();
        const sessionStatus = useUserSession();
        useEffect(() => {
            if (!sessionStatus) {
                router.push("/signin");
            }
        }, [sessionStatus]);

        if (!sessionStatus) return null;

        return <Component {...props} />;
    };
};

export default ProtectedPage;
