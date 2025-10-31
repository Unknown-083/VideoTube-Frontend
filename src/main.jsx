import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Profile from "./Pages/Profile.jsx";
import Subscription from "./Pages/Subscription.jsx";
import AllSubscriptions from "./Pages/AllSubscriptions.jsx";
import Video from "./Pages/Video.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import { Provider } from "react-redux";
import {store} from "./auth/store.js";
import UploadVideo from "./Pages/UploadVideo.jsx";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="subscriptions" element={<Subscription />} />
      <Route path="all-subscriptions" element={<AllSubscriptions />} />
      <Route path="video/:id" element={<Video />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="upload" element={<UploadVideo />} />
    </Route>,
  ])
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
