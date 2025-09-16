import { useState } from "react";
import {
  Search,
  Upload,
  Bell,
  Menu,
  Play,
  MoreVertical,
  HomeIcon,
  User,
  LogOut,
} from "lucide-react";
import SideNav from "../Header/SideNav";
import Header from "../Header/Header";
import Videos from "../Videos";

const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Music",
    "Gaming",
    "Sports",
    "News",
    "Entertainment",
    "Education",
    "Technology",
  ];

  console.log("works");
  
  return (
    <div className="font-sans bg-black min-h-screen text-white">
      {/* Header */}
      <Header/>

      <div className="flex relative">
        <SideNav/>

        <div>
          {/* Navigation */}
          <nav className="bg-black ml-15 px-6 overflow-x-auto">
            <div className="flex gap-3 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-white text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <main className="px-6 ml-15 py-8 max-w-7xl mx-auto">
            <Videos/>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
