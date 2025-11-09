import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayouts from "../Layouts/MainLayouts";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"/login",
        element: <Login/>,
      },
      {
        path:"/register",
        element: <Register/>,
      }
    ],
  },
]);

export default router;