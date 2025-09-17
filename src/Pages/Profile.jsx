import React from "react";
import Header from "../components/Header/Header.jsx";
import SideNav from "../components/Header/SideNav.jsx";
import Videos from "../components/Videos";

const Profile = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Header/>

      <div className="flex w-full overflow-hidden">
        <SideNav />
        <div className="ml-15 p-10 pt-0 w-full pr-25">
          {/* User Info */}
          <div className="flex">
            <div className="rounded-full w-35 h-35 border border-gray-400"></div>
            <div className="pl-4 flex flex-col justify-center gap-2">
              <h1 className="text-4xl font-bold">Full Name</h1>
              <div className="text-md text-gray-400 flex items-center gap-1 mb-2">
                <span>Username</span>
                <span>•</span>
                <span className="cursor-pointer">View channel</span>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="mt-8">
            <div className="flex justify-between mb-3">
              <h2 className="text-2xl font-bold">History</h2>
              <div className="rounded-full border border-gray-500 px-3 py-1">
                View all
              </div>
            </div>
            {/* Videos */}
            <div className="max-w-screen overflow-auto custom-scrollbar">
              <Videos grid={false} />
            </div>
          </div>

          {/* :TODO */}
          {/* Playlists */}
          <div className="mt-8">
            <div className="flex justify-between mb-3">
              <h2 className="text-2xl font-bold">Playlists</h2>
              <div className="rounded-full border border-gray-500 px-3 py-1">
                View all
              </div>
            </div>
            {/* Playlist comp */}
            <div className="max-w-screen overflow-auto custom-scrollbar">

            </div>
          </div>

          {/* Watch Later */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <div className="flex flex-col">

              <h2 className="text-2xl font-bold">Watch Later</h2>
              <p className="text-xs text-gray-400">20 Videos</p>
              </div>
              <div className="rounded-full border h-fit border-gray-500 px-3 py-1">
                View all
              </div>
            </div>
            {/* Videos */}
            <div className="max-w-screen overflow-auto custom-scrollbar">
              <Videos grid={false} />
            </div>
          </div>

          {/* Liked Videos */}
          <div className="mt-8 mb-10">
            <div className="flex justify-between items-center mb-3">
              <div className="flex flex-col">
              <h2 className="text-2xl font-bold">Liked Videos</h2>
              <p className="text-xs text-gray-400">100 Videos</p>
              </div>
              <div className="rounded-full border h-fit border-gray-500 px-3 py-1">
                View all
              </div>
            </div>
            {/* Videos */}
            <div className="max-w-screen overflow-auto custom-scrollbar">
              <Videos grid={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
