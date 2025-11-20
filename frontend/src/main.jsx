/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const RootProvider = () => {
  const Router = createBrowserRouter([{ path: "/", element: <App /> }]);
  return <RouterProvider router={Router} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootProvider />
  </StrictMode>
);
