import { useEffect, useState } from "react";
import {
  Share2,
  MoreVertical,
  Eye,
  Calendar,
  Users,
  Video,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios.js";
import { toggleSubscribe } from "../utils/toggleLikeSubscribe.js";
import { formatDate } from "../utils/helpers.js";
import Videos from "../components/Videos.jsx";
import { formatVideoData } from "../utils/helpers.js";
import Header from "../components/Header/Header.jsx";

const Channel = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelData, setChannelData] = useState([]);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const { data } = await axios.get(`api/v1/users/c/${id}`);
        // Process the response data as needed
        console.log(data.data);
        
        setChannelData(data.data);
        setIsSubscribed(data.data.isSubscribed);
        setVideos(data.data.videos.map(formatVideoData));
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelData();
  }, [id]);

  // const videos = [
  //   {
  //     id: 1,
  //     title: "iPhone 15 Pro Max Complete Review - Worth the Upgrade?",
  //     thumbnail: "📱",
  //     views: "1.2M",
  //     uploadTime: "2 days ago",
  //     duration: "18:42",
  //     likes: "89K",
  //   },
  //   {
  //     id: 2,
  //     title: "M3 MacBook Pro - Game Changer for Creators",
  //     thumbnail: "💻",
  //     views: "856K",
  //     uploadTime: "5 days ago",
  //     duration: "22:15",
  //     likes: "67K",
  //   },
  //   {
  //     id: 3,
  //     title: "Best Budget Smartphones 2024 - Top 5 Picks",
  //     thumbnail: "📲",
  //     views: "645K",
  //     uploadTime: "1 week ago",
  //     duration: "15:33",
  //     likes: "54K",
  //   },
  //   {
  //     id: 4,
  //     title: "PS5 vs Xbox Series X - Ultimate Gaming Comparison",
  //     thumbnail: "🎮",
  //     views: "923K",
  //     uploadTime: "1 week ago",
  //     duration: "25:10",
  //     likes: "71K",
  //   },
  //   {
  //     id: 5,
  //     title: "AirPods Pro 2 Review - Are They Worth It?",
  //     thumbnail: "🎧",
  //     views: "534K",
  //     uploadTime: "2 weeks ago",
  //     duration: "12:28",
  //     likes: "43K",
  //   },
  //   {
  //     id: 6,
  //     title: "Samsung Galaxy S24 Ultra - Everything You Need to Know",
  //     thumbnail: "📱",
  //     views: "1.1M",
  //     uploadTime: "2 weeks ago",
  //     duration: "20:45",
  //     likes: "82K",
  //   },
  //   {
  //     id: 7,
  //     title: "Best Laptops for Students 2024 - Budget Friendly",
  //     thumbnail: "💻",
  //     views: "445K",
  //     uploadTime: "3 weeks ago",
  //     duration: "16:22",
  //     likes: "38K",
  //   },
  //   {
  //     id: 8,
  //     title: "Smart Home Setup Tour - My Complete Setup",
  //     thumbnail: "🏠",
  //     views: "789K",
  //     uploadTime: "3 weeks ago",
  //     duration: "28:15",
  //     likes: "61K",
  //   },
  //   {
  //     id: 9,
  //     title: "DJI Mini 4 Pro Drone Review - Best Travel Drone?",
  //     thumbnail: "🚁",
  //     views: "367K",
  //     uploadTime: "1 month ago",
  //     duration: "19:50",
  //     likes: "29K",
  //   },
  //   {
  //     id: 10,
  //     title: "Apple Vision Pro - The Future of Computing?",
  //     thumbnail: "🥽",
  //     views: "2.1M",
  //     uploadTime: "1 month ago",
  //     duration: "32:18",
  //     likes: "156K",
  //   },
  //   {
  //     id: 11,
  //     title: "Gaming PC Build Guide 2024 - Step by Step",
  //     thumbnail: "🖥️",
  //     views: "678K",
  //     uploadTime: "1 month ago",
  //     duration: "35:42",
  //     likes: "52K",
  //   },
  //   {
  //     id: 12,
  //     title: "Camera Comparison - iPhone vs Professional DSLR",
  //     thumbnail: "📷",
  //     views: "523K",
  //     uploadTime: "2 months ago",
  //     duration: "21:15",
  //     likes: "41K",
  //   },
  // ];

  const stats = [
    { icon: Users, label: "Subscribers", value: channelData.subscribersCount },
    { icon: Video, label: "Videos", value: channelData.totalVideos },
    { icon: Eye, label: "Total Views", value: channelData.totalViews },
    {
      icon: Calendar,
      label: "Joined",
      value: formatDate(channelData.createdAt),
    },
  ];

  const handleSubscribe = async (id) => {
    await toggleSubscribe({ channelId: id });
    setIsSubscribed(!isSubscribed);

    const newSubscribersCount = isSubscribed
      ? channelData.subscribersCount - 1
      : channelData.subscribersCount + 1;

    setChannelData((prev) => ({
      ...prev,
      subscribersCount: newSubscribersCount,
    }));
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen">
        {/* Cover Image */}
        <div className="h-48 md:h-64 relative overflow-hidden">
          <img
            src={channelData?.coverImage?.url}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        {/* Channel Header */}
        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-6">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-br from-teal-600 to-teal-800 rounded-full flex items-center justify-center text-5xl font-bold border-4 border-black">
              <img
                src={channelData?.avatar?.url}
                className="w-full h-full rounded-full object-cover"
                alt=""
              />
            </div>

            {/* Channel Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {channelData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm mb-4">
                <span>{channelData.username}</span>
                <span>•</span>
                <span>{channelData.subscribersCount} subscribers</span>
                <span>•</span>
                <span>{channelData.totalVideos} videos</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => {
                  handleSubscribe(channelData._id);
                }}
                className={`flex-1 md:flex-none px-6 py-2 rounded-full font-medium transition-all ${
                  isSubscribed
                    ? "bg-[#272727] text-white hover:bg-[#3a3a3a]"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>

              <button className="p-2 bg-[#272727] hover:bg-[#3a3a3a] rounded-full transition-all">
                <Share2 className="w-5 h-5" />
              </button>

              <button className="p-2 bg-[#272727] hover:bg-[#3a3a3a] rounded-full transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-[#272727] rounded-xl p-4 hover:bg-[#3a3a3a] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                      <p className="text-lg font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="border-b border-[#272727] mb-6">
            <div className="flex gap-8">
              {["videos", "about"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-medium transition-all relative ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {activeTab === "videos" ? (
            <div>
              {/* Videos Grid/List */}
              <div className="mb-12">
                <Videos videoArray={videos} grid="false" />
              </div>
            </div>
          ) : (
            // About Tab
            <div className="mb-12">
              <div className="bg-[#272727] rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About</h2>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">
                    Channel Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {channelData.description}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Channel Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Subscribers</p>
                          <p className="text-xl font-bold text-white">
                            {channelData.subscribersCount}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total Views</p>
                          <p className="text-xl font-bold text-white">
                            {channelData.totalViews}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Video className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total Videos</p>
                          <p className="text-xl font-bold text-white">
                            {channelData.totalVideos}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Joined</p>
                          <p className="text-xl font-bold text-white">
                            {formatDate(channelData.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
