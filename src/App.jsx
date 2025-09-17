import { useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./auth/authSlice";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.status) {
      console.log("User is already logged in");
      return;
    }

    const getCurentUser = async () => {
      try {
        const user = await axios.get("/api/v1/users/get-user");

        console.log("user", user.data.data?.data);

        if (!user) {
          navigate("/login");
        }
        dispatch(login(user.data.data.data));
      } catch (error) {
        console.error("Error fetching current user:", error);
        navigate("/login");
      }
    };
    getCurentUser();
  }, [auth.status, navigate, dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
