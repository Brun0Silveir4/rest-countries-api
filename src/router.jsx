import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import SpecificCountrie from "./pages/SpecificCountrie/SpecificCountrie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:"/countrie/:code",
    element: <SpecificCountrie />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);


export default router