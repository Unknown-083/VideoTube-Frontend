import { useState } from "react";
import Header from "../components/Header/Header.jsx";
import SideNav from "../components/Header/SideNav.jsx";
import Videos from "../components/Videos.jsx";

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
  
  return (
    <div className="font-sans min-h-screen text-white">
      {/* Header */}
      <Header/>

      <div className="flex relative w-full">
        <SideNav/>

        <div className="w-full">
          {/* Navigation */}
          <nav className="ml-15 px-6 overflow-x-auto">
            <div className="flex gap-3 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-white text-black"
                      : "bg-[#272727] text-gray-300 hover:text-white"
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
