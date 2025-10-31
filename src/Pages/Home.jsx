import { useRef, useState } from "react";
import Header from "../components/Header/Header.jsx";
import SideNav from "../components/Header/SideNav.jsx";
import Videos from "../components/Videos.jsx";

const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    'Music',
    'Gaming',
    'Sports',
    'News',
    'Entertainment',
    'Education',
    'Technology',
    'Science',
    'Travel',
    'Cooking',
    'Fitness',
    'Fashion',
    'Comedy',
    'Documentary'
  ];

  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const scroll = () => {
      if (!scrollRef.current) return;
      
      if (x > width * 0.85) {
        // Scroll right
        scrollRef.current.scrollLeft += 5;
        animationRef.current = requestAnimationFrame(scroll);
      } else if (x < width * 0.15) {
        // Scroll left
        scrollRef.current.scrollLeft -= 5;
        animationRef.current = requestAnimationFrame(scroll);
      }
    };

    scroll();
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
  
  return (
    <div className="font-sans min-h-screen text-white">
      {/* Header */}
      <Header/>

      <div className="flex relative w-full">
        <SideNav/>

        <div className="w-full">
          {/* Navigation */}
          <nav 
            className="ml-15 px-6 relative overflow-hidden" 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
          >
            <div 
              ref={scrollRef} 
              className="flex gap-3 overflow-x-auto scrollbar-hide"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
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

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Homepage;