import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { Bookmark, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "../utils/axios.js";
import { formatViews, timeAgo, formatDate } from "../utils/helpers.js";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input.jsx";
import { toggleVideoLike, toggleSubscribe } from "../utils/toggleLikeSubscribe.js";

const Video = () => {
  const videos = useSelector((state) => state.video.videos);
  const [video, setVideo] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState(null);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
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
          error,
        );
      }
    };
    getVideoDetails();
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      const { data } = await axios.get(`/api/v1/comments/${id}`);

      setComments(data.data);
    };
    getComments();
  }, [id]);

  const addComment = async () => {
    try {
      const { data } = await axios.post(`/api/v1/comments/${id}`, {
        content: comment,
      });

      setComments((prev) => ({
        ...prev,
        comments: [data.data, ...prev.comments],
        totalComments: prev.totalComments + 1,
      }));
      setComment("");
    } catch (error) {
      console.error("Video :: addComment :: Error adding comment:", error);
    }
  };

  const toggleCommentLike = async (commentId) => {
    try {
      const { data } = await axios.post(`api/v1/likes/toggle/c/${commentId}`);
      
      // Toggle hasLiked and update likesCount
      setComments((prev) => ({
        ...prev,
        comments: prev.comments.map((comment) => {
          if (comment._id === commentId) {
            const newHasLiked = !comment.hasLiked;
            return {
              ...comment,
              hasLiked: newHasLiked,
              likesCount: newHasLiked
                ? comment.likesCount + 1
                : comment.likesCount - 1,
            };
          }
          return comment;
        }),
      }));
    } catch (error) {
      console.error(
        "Video :: toggleCommentLike :: Error liking comment:",
        error,
      );
    }
  };

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
                onClick={() => navigate(`/channel/${video?.owner?._id}`)}
              ></div>

              <div className="w-full flex justify-between">
                <div className="flex items-center gap-5 pb-1">
                  <div className="flex flex-col ml-3">
                    <h3 className="text-md">{video?.owner?.fullname}</h3>
                    <p className="text-xs text-gray-400">
                      {video?.owner?.subscribersCount || "0"} subscribers
                    </p>
                  </div>
                  <div
                    className={`mt-1 w-25 rounded-full font-medium py-1.5 text-black flex items-center justify-center ${
                      video?.owner?.isSubscribed
                        ? "bg-[#272727] text-white"
                        : "bg-white"
                    } cursor-pointer px-4`}
                    onClick={() => toggleSubscribe({ channelId: video?.owner?._id, setVideo })}
                  >
                    <p className="self-center">
                      {video?.owner?.isSubscribed ? "Subscribed" : "Subscribe"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-center text-sm">
                  <div className="rounded-full items-center p-1.5 px-4 bg-[#272727] flex gap-1 cursor-pointer hover:text-white">
                    <ThumbsUp
                      className={`p-0.5 ${
                        video?.hasLiked
                          ? "text-white fill-white"
                          : "hover:text-white"
                      }`}
                      onClick={() => toggleVideoLike(id, setVideo)}
                    />{" "}
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
            <div className="w-full">
              <h1 className="text-xl font-bold py-4">
                {comments?.totalComments} Comments
              </h1>

              <div className="w-full flex gap-4 items-center">
                <img
                  src={user?.avatar?.url}
                  alt="avatar"
                  className="rounded-full w-10 h-10"
                />
                <Input
                  className="border-b-1 border-[#272727] text-sm w-full pb-1 focus:outline-none bg-transparent focus:border-b-white"
                  value={comment}
                  placeholder="Add a comment..."
                  onChange={(e) => setComment(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
                <button
                  name="comment"
                  className={`text-sm px-2 py-1 rounded-full transition-colors ${
                    isInputFocused
                      ? "bg-white text-black font-medium"
                      : "bg-[#272727]"
                  }`}
                  disabled={!comment.trim()}
                  onClick={addComment}
                >
                  Add
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                {comments &&
                  comments.comments.map((comment) => (
                    <div key={comment?._id} className="flex">
                      <img
                        src={comment?.owner?.avatar?.url || user?.avatar?.url}
                        alt=""
                        className="rounded-full w-10 h-10"
                      />

                      <div className="ml-4">
                        <div className="flex">
                          <p className="text-sm">
                            @{comment?.owner?.username || user?.username} •
                            <span className="ml-1 text-gray-500 text-xs">
                              {timeAgo(comment?.createdAt)}
                            </span>
                          </p>
                        </div>

                        <h3 className="text-md">{comment?.content}</h3>

                        <div className="flex gap-1 items-center">
                          <ThumbsUp
                            className={`w-4 cursor-pointer transition-colors ${
                              comment?.hasLiked
                                ? "text-white fill-white"
                                : "hover:text-white"
                            }`}
                            onClick={() => toggleCommentLike(comment?._id)}
                          />
                          <span className="text-xs">{comment?.likesCount}</span>
                        </div>
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
              className="flex w-full mb-4 cursor-pointer"
            >
              <img
                src={video.avatar}
                alt={video.title}
                className="w-[40%] h-24 rounded-lg bg-gray-500 mr-4"
              />
              <div className="w-[60%]">
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
