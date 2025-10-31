import { useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./auth/authSlice";
import axios from "axios";
import { setLikedVideos, setVideos, setWatchHistory } from "./auth/videoSlice.js";
import Loading from "./components/Loading.jsx";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  function formatViews(views) {
    if (views >= 1e9) {
      return (views / 1e9).toFixed(1) + "B views";
    } else if (views >= 1e6) {
      return (views / 1e6).toFixed(1) + "M views";
    } else if (views >= 1e3) {
      return (views / 1e3).toFixed(1) + "K views";
    } else {
      return `${views} views`;
    }
  }

  function formatDuration(durationInSeconds) {
    const totalSeconds = Math.floor(durationInSeconds);

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${mins}:${secs}`;
    } else {
      return `${mins}:${secs}`;
    }
  }

  // Check if user is logged in
  useEffect(() => {
    if (auth.status) {
      console.log("User is already logged in");
      return;
    }

    const getCurentUser = async () => {
      try {
        const user = await axios.get("/api/v1/users/get-user");

        if (!user) {
          navigate("/login");
        }
        dispatch(login(user.data.data.data));
      } catch (error) {
        console.error("Error fetching current user:", error);
        navigate("/login");
      }
    };
    getCurentUser();
  }, [auth.status, navigate, dispatch]);

  // Fetch videos from server
  useEffect(() => {
    const getVideos = async () => {
      try {
        const { data } = await axios.get("/api/v1/videos");
        const allvideos = data.data?.videos;

        const finalVideos = allvideos.map((video) => ({
          id: video._id,
          title: video.title,
          description: video.description,
          channel: video.owner.fullname,
          avatar: video.owner?.avatar?.url || "",
          videoFile: video.videoFile?.url || "",
          thumbnail: video.thumbnail?.url || "",
          views: formatViews(video.views),
          time: timeAgo(video.createdAt),
          duration: formatDuration(video.duration),
        }));

        dispatch(setVideos(finalVideos));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    getVideos();
  }, [dispatch]);

  // Fetch watch history and liked videos could be added here similarly

  useEffect(() => {
    const getWatchHistoryAndLikedVideos = async () => {
      try {
        // Watch History
        let { data } = await axios.get("/api/v1/users/history");
        console.log("watch history :: ", data);

        let allVideos = data.data;

        const watchHistory = allVideos.map((video) => ({
          id: video._id,
          title: video.title,
          description: video.description,
          channel: video.owner?.fullname,
          avatar: video.owner?.avatar?.url || "",
          videoFile: video.videoFile?.url || "",
          thumbnail: video.thumbnail?.url || "",
          views: formatViews(video.views),
          time: timeAgo(video.createdAt),
          duration: formatDuration(video.duration),
        }));

        console.log("Formatted Watch History :: ", watchHistory);
        dispatch(setWatchHistory(watchHistory));
        
        // Liked Videos can be fetched and dispatched similarly
        data = await axios.get("/api/v1/likes/videos");
        console.log("liked videos 22 :: ", data);

        allVideos = data.data?.data[0]?.video;
        
        const likedVideos = allVideos?.map((video) => ({
          id: video._id,
          title: video.title,
          description: video.description,
          channel: video.owner.fullname,
          avatar: video.owner?.avatar?.url || "",
          videoFile: video.videoFile?.url || "",
          thumbnail: video.thumbnail?.url || "",
          views: formatViews(video.views),
          time: timeAgo(video.createdAt),
          duration: formatDuration(video.duration),
        }));

        console.log("Formatted Liked Videos :: ", likedVideos);
        dispatch(setLikedVideos(likedVideos));        

      } catch (error) {
        console.error("App.jsx :: getWatchHistory :: error ", error);        
      }
    };
    getWatchHistoryAndLikedVideos();

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading? <Loading/> : <Outlet />}
    </>
  );
}

export default App;
