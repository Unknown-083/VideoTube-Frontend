import React from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {login as authLogin} from "../auth/authSlice"
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async(e) => {
    e.preventDefault();
    // console.log("login", e.target.value, username, password);

    try {
      const isEmail = username.includes("@");

      let data;
      if (isEmail) {
        data = await axios.post("/api/v1/users/login", {email: username, password});
      }

      else{
        data = await axios.post("/api/v1/users/login", {username, password});
      }

      console.log("res", data.data.data.loggedInUser);

      dispatch(authLogin(data.data.data.loggedInUser));

      // Reset form fields
      setUsername("");
      setPassword("");

      // Redirect or perform other actions after successful login
      navigate("/");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <form method="post" onSubmit={login} className="w-full">
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-8 border border-[#272727] rounded-xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Sign in to your account</p>
          </div>
          
          {/* Form Fields */}
          <div className="space-y-4">
            <Input
              placeholder="Email or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 mt-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg"
          >
            Sign In
          </button>
        
          {/* Signup Link */}
          <div className="pt-4 border-t border-[#272727]">
            <p className="text-sm text-gray-400 text-center">
              Don't have an account?{" "}
              <Link 
                to={"/signup"} 
                className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors duration-200"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;