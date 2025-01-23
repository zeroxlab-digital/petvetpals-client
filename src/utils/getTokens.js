import Cookies from "js-cookie"

export const getUserToken = () => {
    return Cookies.get("user_token") || null;
}