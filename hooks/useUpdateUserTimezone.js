import axios from "axios";
import { useEffect } from "react";;

export const useUpdateUserTimezone = () => {
    useEffect(() => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone !== localStorage.getItem("user-timezone")) {
            axios.patch(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/update-timezone`, { timezone }, { withCredentials: true })
                .then(() => console.log("Timezone updated successfully!"))
                .catch((err) => console.error("Error updating timezone:", err));
            localStorage.setItem("user-timezone", timezone);
        }
    }, [])
}