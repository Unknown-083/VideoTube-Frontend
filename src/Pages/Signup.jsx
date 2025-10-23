import React from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

const Signup = () => {
  const [avatar, setAvatar] = React.useState(null);
  const [coverImage, setCoverImage] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const avatarRef = React.useRef();
  const coverImageRef = React.useRef();

  const signup = (e) => {
    e.preventDefault();
    console.log("signup", e.target.value, avatar, coverImage);

    
    // Reset form fields
    coverImageRef.current.value = null;
    avatarRef.current.value = null;
    setAvatar(null);
    setCoverImage(null);
    setEmail("");
    setUsername("");
    setFullName("");
    setPassword("");
  };
  return (
    <form method="post" onSubmit={signup} className="w-full px-5 py-10">
      <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-8 border border-gray-600 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm">Join us and get started today</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <Input
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* File Upload Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300 font-medium">
                Avatar
              </label>
              <Input
                type="file"
                ref={avatarRef}
                placeholder="Choose avatar"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300 font-medium">
                Cover Photo
              </label>
              <Input
                type="file"
                ref={coverImageRef}
                placeholder="Choose cover photo"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 mt-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg"
        >
          Create Account
        </button>

        {/* Login Link */}
        <div className="pt-4 border-t border-[#272727]">
          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
