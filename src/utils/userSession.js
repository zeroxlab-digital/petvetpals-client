import { useSelector } from "react-redux";

export const useUserSession = () => {
    const authUser = useSelector((state) => state.userRedu.user.authUser)
    return Boolean(authUser);
}