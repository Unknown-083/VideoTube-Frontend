import { useEffect, useState } from "react";
import { MoreVertical, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const Videos = ({ grid = true, videoArray = null }) => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState();

  const localVideos = useSelector((state) => state.video.videos);

  useEffect(() => {
    if (!videoArray) {
      setVideos(localVideos);
    } else {
      // console.log("Video Array :: ",videoArray[0]);
      setVideos(videoArray);
    }
  }, [videoArray, localVideos]);

  // console.log(videos);
  

  if(videos){
    return (
      <div
      className={
        grid
          ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
          : `flex gap-4 overflow-scrollbar-hide`
      }
    >
      {videos &&
        videos.map((video) => (
          <div
            key={video.id}
            className="group cursor-pointer"
            onClick={() => navigate(`/video/${video.id}`)}
          >
            {/* Thumbnail */}
            <div
              className={`relative aspect-video  rounded-xl overflow-hidden mb-3 ${
                grid ? "" : "w-55 flex-shrink-0"
              } bg-cover bg-center`}
              style={{ backgroundImage: `url(${video?.thumbnail?.url || video.thumbnail})` }}
            >
              {/* <div className="absolute inset-0 flex items-center justify-center group-hover:bg-opacity-90 hover:bg-opacity-80 transition-all">
                <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div> */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-medium">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="flex gap-3">
              <div
                className="w-9 h-9 bg-gradient-to-br from-teal-600 to-green-800 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundImage: `url(${video.owner?.avatar?.url || video.avatar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white group-hover:text-gray-300 transition-colors line-clamp-2 mb-0.5">
                  {video.title}
                </h3>

                <p className="text-sm text-gray-400 hover:text-gray-300 cursor-pointer transition-colors">
                  {video.channel}
                </p>

                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <span>{video.views}</span>
                  <span>•</span>
                  <span>{video.time}</span>
                </div>
              </div>

              <MoreVertical className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors opacity-0 group-hover:opacity-100 drop-shadow-sm" />
            </div>
          </div>
        ))}
    </div>
    )
  }

  else{
    return <Loading/>
  }
};

export default Videos;
