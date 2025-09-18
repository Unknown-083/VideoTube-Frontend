import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Videos from "../components/Videos";
import { Bookmark, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Video = () => {
  // const Videos = [
  //   {
  //     title: "Video Title",
  //     views: "1.2M views",
  //     timestamp: "2 days ago",
  //     channelImage: "https://via.placeholder.com/36",
  //     channel: "Channel Name",
  //     image: "https://via.placeholder.com/210x118",
  //   },
  //   {
  //     title: "Video Title",
  //     views: "1.2M views",
  //     timestamp: "2 days ago",
  //     channelImage: "https://via.placeholder.com/36",
  //     channel: "Channel Name",
  //     image: "https://via.placeholder.com/210x118",
  //   },
  //   {
  //     title: "Video Title",
  //     views: "1.2M views",
  //     timestamp: "2 days ago",
  //     channelImage: "https://via.placeholder.com/36",
  //     channel: "Channel Name",
  //     image: "https://via.placeholder.com/210x118",
  //   },
  //   {
  //     title: "Video Title",
  //     views: "1.2M views",
  //     timestamp: "2 days ago",
  //     channelImage: "https://via.placeholder.com/36",
  //     channel: "Channel Name",
  //     image: "https://via.placeholder.com/210x118",
  //   },
  // ];

  const videos = useSelector((state) => state.video.videos);
  const [video, setVideo] = React.useState(null);

  const { id } = useParams();
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const { data } = await axios.get(`/api/v1/videos/${id}`);
        console.log("Video :: getVideoDetails :: res:", data.data[0]);
        setVideo(data.data[0]);
      } catch (error) {
        console.error(
          "Video :: getVideoDetails :: Error fetching video details:",
          error
        );
      }
    };
    getVideoDetails();
  }, []);

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

  function formatDate(isoString) {
    const date = new Date(isoString);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    const [day, month, year] = date
      .toLocaleDateString("en-GB", options)
      .split(" ");

    return `${day} ${month}, ${year}`;
  }

  return (
    <div>
      <Header />

      <div className="flex p-3 px-6 gap-5">
        {/* Video */}
        <div className="w-[60%]">
          <div
            className="h-90 bg-gray-500 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${video?.thumbnail?.url})` }}
          ></div>

          {/* Video Details */}

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-white">
              {/* Video Title - Full Title Here */}
              {video?.title}
            </h1>

            <div className="flex mt-2">
              <div
                className="w-10 h-10 rounded-full bg-gray-500 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${video?.owner[0]?.avatar.url || "#"})`,
                }}
              ></div>

              <div className="w-full flex justify-between">
                <div className="flex items-center gap-5 pb-1">
                  <div className="flex flex-col ml-3">
                    <h3 className="text-md">{video?.owner[0]?.fullname}</h3>
                    <p className="text-xs text-gray-400">
                      {video?.subscribers?.length || "0"} subscribers
                    </p>
                  </div>
                  <div className="mt-1 rounded-full font-medium p-1.5 px-4 bg-white text-black">
                    Subscribe
                  </div>
                </div>

                <div className="flex gap-2 items-center text-sm">
                  <div className="rounded-full items-center p-1.5 px-4 bg-gray-700 flex gap-1 cursor-pointer hover:text-white">
                    <ThumbsUp className="p-0.5" />{" "}
                    <span className="pr-3 font-medium border-r border-r-gray-400">
                      100
                    </span>
                    <ThumbsDown className="ml-2 p-0.5" />
                  </div>
                  <div className="rounded-full self-center p-1.5 pr-2.5 bg-gray-700 cursor-pointer hover:text-white flex gap-1 items-center">
                    <Share2 className="p-0.5" />
                    <span className="font-medium">Share</span>
                  </div>
                  <div className="rounded-full self-center p-1.5 bg-gray-700 cursor-pointer hover:text-white">
                    <Bookmark className="p-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-2 text-sm bg-gray-700 rounded-lg">
              <div className="font-medium">
                {formatViews(video?.views)} • {formatDate(video.updatedAt)}
              </div>
              <p className="text-white">
                {video.description}
              </p>
            </div>
          </div>
        </div>

        {/* More Videos */}
        <div className="w-[40%] h-90 p-2 pt-0">
          {videos.map((video, index) => (
            <div key={index} className="flex mb-4">
              <img
                src={video.avatar}
                alt={video.title}
                className="w-40 h-24 rounded-lg bg-gray-500 mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400">{video.channel}</p>
                <p className="text-sm text-gray-400">
                  {video.views} • {video.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
