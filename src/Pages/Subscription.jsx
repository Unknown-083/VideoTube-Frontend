import React from "react";
import Header from "../components/Header/Header.jsx";
import SideNav from "../components/Header/SideNav.jsx";
import Videos from "../components/Videos.jsx";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="flex">
        <SideNav />
        <div className="p-6 ml-15">
          <h1 className="text-3xl font-bold mb-4">Subscription</h1>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl text-gray-400">Latest Videos</h2>
            <h2 className="text-md text-blue-400 cursor-pointer hover:text-blue-500" onClick={() => navigate("/all-subscriptions")}>Manage</h2>
          </div>
          <Videos />
        </div>
      </div>
    </div>
  );
};

export default Subscription;
