import React from "react";
import { MoreVertical, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Videos = ({
  grid = true,
}) => {
    
  const videos = [
    {
      id: 1,
      title: "Amazing Nature Documentary: Wild Life Safari",
      channel: "NatureHub",
      views: "2.3M",
      time: "3 days ago",
      duration: "12:45",
    },
    {
      id: 2,
      title: "JavaScript Tutorial for Beginners - Complete Guide",
      channel: "CodeMaster",
      views: "856K",
      time: "1 week ago",
      duration: "45:20",
    },
    {
      id: 3,
      title: "Epic Gaming Moments Compilation 2024",
      channel: "GameZone",
      views: "1.2M",
      time: "2 days ago",
      duration: "8:15",
    },
    {
      id: 4,
      title: "Cooking Masterclass: Authentic Italian Pasta",
      channel: "ChefLife",
      views: "445K",
      time: "5 days ago",
      duration: "18:30",
    },
    {
      id: 5,
      title: "Latest Tech News Update - AI Revolution",
      channel: "TechToday",
      views: "678K",
      time: "1 day ago",
      duration: "15:22",
    },
    {
      id: 6,
      title: "Full Body Fitness Workout at Home",
      channel: "FitnessPro",
      views: "923K",
      time: "4 days ago",
      duration: "25:10",
    },
    {
      id: 7,
      title: "Travel Vlog: Mountain Adventure in Nepal",
      channel: "Wanderlust",
      views: "334K",
      time: "1 week ago",
      duration: "22:45",
    },
    {
      id: 8,
      title: "Music Production Masterclass with Pro Tips",
      channel: "BeatMakers",
      views: "567K",
      time: "3 days ago",
      duration: "35:15",
    },
    {
      id: 9,
      title: "DIY Home Renovation Tips and Tricks",
      channel: "HomeImprove",
      views: "789K",
      time: "2 weeks ago",
      duration: "28:33",
    },
    {
      id: 10,
      title: "Cryptocurrency Explained Simply for Everyone",
      channel: "CryptoGuide",
      views: "1.1M",
      time: "1 week ago",
      duration: "16:42",
    },
    {
      id: 11,
      title: "Photography Tips for Beginners - Light & Composition",
      channel: "PhotoPro",
      views: "445K",
      time: "5 days ago",
      duration: "19:28",
    },
    {
      id: 12,
      title: "Science Experiment Gone Wild! Explosive Results",
      channel: "ScienceFun",
      views: "2.1M",
      time: "3 days ago",
      duration: "11:17",
    },
  ];
  
  const navigate = useNavigate();
  
  return (
    <div className={grid?`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` : `flex gap-4 overflow-scrollbar-hide`}>
      {videos.map((video) => (
        <div key={video.id} className="group cursor-pointer" onClick={() => navigate("/video")}>
          {/* Thumbnail */}
          <div className={`relative aspect-video bg-gray-600 rounded-xl overflow-hidden mb-3 ${grid ? '' : 'w-55 flex-shrink-0'}`}>
            <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black group-hover:bg-opacity-20 transition-all">
              <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-medium">
              {video.duration}
            </div>
          </div>

          {/* Video Info */}
          <div className="flex gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-teal-600 to-green-800 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">
                {video.channel.charAt(0)}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white group-hover:text-gray-300 transition-colors line-clamp-2 mb-1">
                {video.title}
              </h3>

              <p className="text-sm text-gray-400 hover:text-gray-300 cursor-pointer transition-colors mb-1">
                {video.channel}
              </p>

              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.time}</span>
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
