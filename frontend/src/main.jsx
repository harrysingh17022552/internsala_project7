/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Product from "./Product.jsx";
import ProductDetails from "./OtherComponent/product/ProductDetails.jsx";
import CategoryDetails from "./OtherComponent/category/CategoryDetails.jsx";
import Cart from "./OtherComponent/cart/Cart.jsx";
import PlaceOrder from "./OtherComponent/payment/PlaceOrder.jsx";
import CustomError from "./OtherComponent/error/CustomError.jsx";
import Er404 from "./OtherComponent/error/Er404.jsx";
const RootProvider = () => {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "category/:category",
          element: <CategoryDetails />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "products",
          element: <Product />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "place_order",
          element: <PlaceOrder />,
        },
        {
          path: "custom_error/:error",
          element: <CustomError />,
        },
      ],
      errorElement: <Er404 />,
    },
  ]);
  return <RouterProvider router={Router} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootProvider />
  </StrictMode>
);
