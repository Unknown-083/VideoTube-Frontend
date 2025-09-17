import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [
      {
        id: 1,
        title: "Learn React in 30 Minutes",
        description: "A quick introduction to React.js for beginners.",
        channel: "Code Academy",
        avatar: "https://example.com/avatar1.jpg",
        videoFile: "https://example.com/video1.mp4",
        thumbnail: "https://example.com/thumbnail1.jpg",
        views: "1.2M",
        time: "2 days ago",
        duration: "30:00",
      },
    ],
  },
  reducers: {
    setVideos: (state, action) => {
      console.log("action.payload", action.payload);
      const newVideos = action.payload.map((video) => {
        const {
          _id,
          title,
          description,
          videoFile,
          thumbnail,
          views,
          duration,
          owner,
          updatedAt,
        } = video;

        return {
          id: _id,
          title,
          description,
          channel: owner?.fullname || "Unknown",
          avatar: owner?.avatar?.url || "",
          videoFile: videoFile?.url || "",
          thumbnail: thumbnail?.url || "",
          views,
          time: updatedAt,
          duration,
        };
      });

      state.videos = [...newVideos];
      console.log("state.videos", state.videos);
    },
  },
});

export default videoSlice.reducer;
export const { setVideos } = videoSlice.actions;
