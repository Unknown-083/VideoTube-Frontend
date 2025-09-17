import React, { useEffect } from "react";
import { MoreVertical, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../auth/videoSlice";

const Videos = ({ grid = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videos = useSelector((state) => state.video.videos);

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

  useEffect(() => {
    const getVideos = async () => {
      try {
        await axios.get("/api/v1/videos").then((res) => {
          console.log("videos", res.data.data?.videos);
          // allvideos = res.data.data?.videos;
          dispatch(setVideos(res.data.data?.videos));
        });
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    getVideos();
  }, []);

  useEffect(() => {
    console.log("allvideos", videos);
  }, [videos]);

  return (
    <div
      className={
        grid
          ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
          : `flex gap-4 overflow-scrollbar-hide`
      }
    >
      {videos.map((video) => (
        <div
          key={video.id}
          className="group cursor-pointer"
          onClick={() => navigate("/video")}
        >
          {/* Thumbnail */}
          <div
            className={`relative aspect-video  rounded-xl overflow-hidden mb-3 ${
              grid ? "" : "w-55 flex-shrink-0"
            } bg-cover bg-center`}
            style={{ backgroundImage: `url(${video.thumbnail})` }}
          >
            <div className="absolute inset-0 flex items-center justify-center group-hover:bg-opacity-90 hover:bg-opacity-80 transition-all">
              <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-medium">
              {formatDuration(video.duration)}
            </div>
          </div>

          {/* Video Info */}
          <div className="flex gap-3">
            <div
              className="w-9 h-9 bg-gradient-to-br from-teal-600 to-green-800 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundImage: `url(${video.avatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white group-hover:text-gray-300 transition-colors line-clamp-2 mb-1">
                {video.title}
              </h3>

              <p className="text-sm text-gray-400 hover:text-gray-300 cursor-pointer transition-colors mb-1">
                {video.channel}
              </p>

              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span>{formatViews(video.views)} views</span>
                <span>•</span>
                <span>{timeAgo(video.time)}</span>
              </div>
            </div>

            <MoreVertical className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors opacity-0 group-hover:opacity-100 drop-shadow-sm" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
