import axios from "../utils/axios.js";

export const fetchSubscriptions = async ({ id, setSubscriptions, setSubscribedState } = {}) => {
    try {
        const { data } = await axios.get(
            `/api/v1/subscriptions/get-subscribed-channels/${id}`,
        );
        setSubscriptions(data.data || []);
        // Initialize all as subscribed (since these are the user's subscriptions)
        if (setSubscribedState) {
            const initialState = {};
            data.data?.forEach((sub) => {
                initialState[sub._id] = true;
            });
            setSubscribedState(initialState);
        }
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
    }
};