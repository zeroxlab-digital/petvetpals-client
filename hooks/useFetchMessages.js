import { setMessages } from "@/redux/features/messageSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchMessages = (refreshTrigger) => {
    const dispatch = useDispatch();
    const {clickedParticipant, messages} = useSelector((state) => state.messageRedu);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!clickedParticipant?._id) return;

        const handleFetchMessages = async () => {
            // Reset state before fetching new messages
            dispatch(setMessages([]));
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/message/${clickedParticipant._id}`, {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    dispatch(setMessages(res.data?.messages || []));
                } else {
                    dispatch(setMessages([]));
                }
            } catch (error) {
                dispatch(setMessages([]));
                setError({ message: "There was an error while fetching messages!", error: error.response?.data?.message || "Unknown error" });
            } finally {
                setLoading(false);
            }
        };

        handleFetchMessages();
    }, [clickedParticipant, dispatch, refreshTrigger]);

    return { messages, loading, error };
};

export default useFetchMessages;
