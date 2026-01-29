import React, { useState } from "react";
import { Menu, Play, Search, Upload, Bell } from "lucide-react";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import SideNavPopUp from "./SideNavPopUp";
import Logo from "./Logo";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sideNavPopupOpen, setSideNavPopupOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50 ">
      {sideNavPopupOpen && (
        <SideNavPopUp closeSideNav={() => setSideNavPopupOpen(false)} />
      )}
      <div className="flex items-center gap-6">
        <Menu
          className="w-6 h-6 font-extralight cursor-pointer hover:text-gray-300 transition-colors"
          onClick={() => setSideNavPopupOpen(!sideNavPopupOpen)}
        />
        <Logo/>
      </div>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2  hover:bg-[#393E46] p-2 rounded-full transition-colors">
            <Search className="w-5 h-4 text-[#EEEEEE]" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 border border-[#272727] text-[#EEF0E5] px-4 py-2 rounded-full transition-all transform hover:scale-105"
          onClick={() => navigate("/upload")}
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Create</span>
        </button>
        <Bell className="w-6 h-6 cursor-pointer text-[#EEEEEE] hover:text-gray-300 transition-colors" />
      </div>
    </header>
  );
};

export default Header;
