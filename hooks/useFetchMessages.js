import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFetchMessages = () => {
    const clickedParticipant = useSelector((state) => state.messageRedu.clickedParticipant);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!clickedParticipant?._id) return;

        const handleFetchMessages = async () => {
            // Reset state before fetching new messages
            setMessages([]);
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/message/${clickedParticipant._id}`, {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    setMessages(res.data?.messages || []);
                } else {
                    setMessages([]);
                }
            } catch (error) {
                setMessages([]);
                setError({ message: "There was an error while fetching messages!", error: error.response?.data?.message || "Unknown error" });
            } finally {
                setLoading(false);
            }
        };

        handleFetchMessages();
    }, [clickedParticipant]);

    return { messages, loading, error };
};

export default useFetchMessages;
