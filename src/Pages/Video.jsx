import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Videos from "../components/Videos";
import { Bookmark, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
  const [comments, setComments] = React.useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);

  const { id } = useParams();
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const { data } = await axios.get(`/api/v1/videos/${id}`);
        setVideo(data.data);
      } catch (error) {
        console.error(
          "Video :: getVideoDetails :: Error fetching video details:",
          error
        );
      }
    };
    getVideoDetails();
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      const { data } = await axios.get(`/api/v1/comments/${id}`);

      console.log("comments ", data.data);
      setComments(data.data);
    };
    getComments();
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

  return (
    <div>
      <Header />

      <div className="flex p-3 px-6 gap-5">
        {/* Video */}
        <div className="w-[60%]">
          <div className="h-80 rounded-2xl bg-cover bg-center">
            <video
              src={video?.videoFile.url}
              poster={video?.thumbnail.url}
              controls
              autoPlay
              playsInline
              controlsList="nodownload"
              className="h-full w-full rounded-xl inset-shadow-2xs"
            ></video>
          </div>

          {/* Video Details */}

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-white">
              {/* Video Title - Full Title Here */}
              {video?.title}
            </h1>

            <div className="flex mt-2 gap-1 items-center">
              <div
                className="h-10 w-11 rounded-full bg-gray-500 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${video?.owner?.avatar.url || "#"})`,
                }}
              ></div>

              <div className="w-full flex justify-between">
                <div className="flex items-center gap-5 pb-1">
                  <div className="flex flex-col ml-3">
                    <h3 className="text-md">{video?.owner?.fullname}</h3>
                    <p className="text-xs text-gray-400">
                      {video?.owner?.subscribersCount || "0"} subscribers
                    </p>
                  </div>
                  <div className="mt-1 rounded-full font-medium p-1.5 px-4 bg-white text-black">
                    Subscribe
                  </div>
                </div>

                <div className="flex gap-2 items-center text-sm">
                  <div className="rounded-full items-center p-1.5 px-4 bg-[#272727] flex gap-1 cursor-pointer hover:text-white">
                    <ThumbsUp className="p-0.5" />{" "}
                    <span className="pr-3 font-medium border-r border-r-gray-400">
                      {video?.likesCount}
                    </span>
                    <ThumbsDown className="ml-2 p-0.5" />
                  </div>
                  <div className="rounded-full self-center p-1.5 pr-2.5 bg-[#272727] cursor-pointer hover:text-white flex gap-1 items-center">
                    <Share2 className="p-0.5" />
                    <span className="font-medium">Share</span>
                  </div>
                  <div className="rounded-full self-center p-1.5 bg-[#272727] cursor-pointer hover:text-white">
                    <Bookmark className="p-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-2 text-sm bg-[#272727] rounded-lg">
              <div className="font-medium">
                {formatViews(video?.views)} • {formatDate(video?.createdAt)}
              </div>
              <p className="text-white">{video?.description}</p>
            </div>

            {/* Comments */}
            <div className="">
              <h1 className="text-xl font-bold py-4">
                {comments?.totalComments} Comments
              </h1>

              <div className="flex gap-4 items-center">
                <img
                  src={user?.avatar?.url}
                  alt="avatar"
                  className="rounded-full w-10 h-10"
                />
                <input
                  type="text"
                  placeholder="Add a comment"
                  className="border-b-1 border-[#272727] text-sm w-full pb-1"
                />
              </div>

              <div className="flex flex-col gap-4 mt-4">
                {comments &&
                  comments.comments.map((comment) => (
                    <div key={comment?._id} className="flex">
                      <img src="" alt="" className="rounded-full w-10 h-10" />

                      <div className="ml-4">
                        <div className="flex">
                          <p className="text-sm">
                            @{comment?.owner?.username}
                            <span className="ml-1 text-gray-500 text-xs">
                              {timeAgo(comment?.createdAt)}
                            </span>
                          </p>
                        </div>

                        <h3 className="text-md">{comment?.content}</h3>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* More Videos */}
        <div className="w-[40%] h-90 p-2 pt-0">
          {videos.map((video, index) => (
            <div
              onClick={() => navigate(`/video/${video.id}`)}
              key={index}
              className="flex mb-4 cursor-pointer"
            >
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
