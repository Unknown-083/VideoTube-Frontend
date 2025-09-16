import React from "react";
import Header from "../Header/Header";
import SideNav from "../Header/SideNav";

const AllSubscriptions = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="flex">
        <SideNav />
        <div className="p-6 px-10 ml-15 w-full">
          <h1 className="text-3xl font-bold text-white mb-4">
            All Subscriptions
          </h1>

          <div className="w-full flex items-center justify-between">
            <div className="rounded-full border border-gray-400 min-w-40 h-40 content-center">
              avatar
            </div>

            <div className="w-full pl-4">
              <h2 className="text-xl mb-3">Channel Name</h2>
              <div className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                <span>username</span>
                <span>•</span>
                <span>subscribers</span>
              </div>
              <p className="text-xs text-gray-400">description</p>
            </div>
            <div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSubscriptions;
