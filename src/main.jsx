import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Pages/Home.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Profile from "./components/Pages/Profile.jsx";
import Subscription from "./components/Pages/Subscription.jsx";
import AllSubscriptions from "./components/Pages/AllSubscriptions.jsx";
import Video from "./components/Pages/Video.jsx";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="profile" element={<Profile/>} />
      <Route path="subscriptions" element={<Subscription/>} />
      <Route path="all-subscriptions" element={<AllSubscriptions/>} />
      <Route path="video" element={<Video/>}/>
    </Route>
  ])
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
