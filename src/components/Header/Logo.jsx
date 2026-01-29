import React from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-2 cursor-pointer group"
      onClick={() => navigate("/")}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-[#00ADB5] to-[#393E46] rounded-lg flex items-center justify-center">
        <Play className="w-5 h-5 text-white fill-current" />
      </div>
      <span className="text-xl font-bold group-hover:text-gray-300 transition-colors">
        चलचित्र
      </span>
    </div>
  );
};

export default Logo;
