import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import { Toaster } from "react-hot-toast";
import Register from "./pages/register";
import CreateProfile from "./pages/create-profile";
import App from "./pages/app";
import Match from "./pages/match";
import { Mentors } from "./pages/mentors";
import Profile from "./pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/user/profile/create",
    element: <CreateProfile />,
  },
  {
    path: "/user/profile",
    element: <Profile />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/app/match",
    element: <Match />,
  },
  {
    path: "/app/mentors",
    element: <Mentors />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
