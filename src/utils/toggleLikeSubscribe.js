import axios from "../utils/axios.js";

export const toggleVideoLike = async (id, setVideo) => {
    try {
        await axios.post(`/api/v1/likes/toggle/v/${id}`);
        // Update video likesCount
        setVideo && setVideo((prev) => {
            const newHasLiked = !prev.hasLiked;
            return {
                ...prev,
                hasLiked: newHasLiked,
                likesCount: newHasLiked ? prev.likesCount + 1 : prev.likesCount - 1,
            };
        });
    } catch (error) {
        console.error("Video :: toggleVideoLike :: Error liking video:", error);
    }
};

export const toggleSubscribe = async ({ channelId, setVideo } = {}) => {
    try {
        // Only make the call if we have the video owner id
        if (!channelId) {
            console.warn("Video or owner ID not available");
            return;
        }

        await axios.get(
            `api/v1/subscriptions/toggle/${channelId}`,
        );
        
        // Only update state if setVideo is provided
        setVideo && setVideo((prev) => ({
            ...prev,
            owner: {
                ...prev.owner,
                isSubscribed: !prev.owner.isSubscribed,
                subscribersCount: prev.owner.isSubscribed
                    ? prev.owner.subscribersCount - 1
                    : prev.owner.subscribersCount + 1,

            },
        }));
    } catch (error) {
        console.error(
            "Video :: toggleSubscribe :: Error toggling subscription:",
            error,
        );
    }
};
