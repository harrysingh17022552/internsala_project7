/* eslint-disable react-refresh/only-export-components */
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import CustomError from "./OtherComponent/error/CustomError.jsx";
import Er404 from "./OtherComponent/error/Er404.jsx";
import Loader from "./Loader.jsx";

//Applied Lazy Loading for all that component that doesn't requires to load immediately, when user visit home page
const Product = lazy(() => import("./Product.jsx"));
const ProductDetails = lazy(() =>
  import("./OtherComponent/product/ProductDetails.jsx")
);
const CategoryDetails = lazy(() =>
  import("./OtherComponent/category/CategoryDetails.jsx")
);
const Cart = lazy(() => import("./OtherComponent/cart/Cart.jsx"));
const PlaceOrder = lazy(() =>
  import("./OtherComponent/checkout/PlaceOrder.jsx")
);

//Creating root provider, that render the page as per url segments, some component are the children that share common component of their parents using Outlet,
// here error is managed for both the cases either page is not found and when frontend unable to fetch data
// & lazy component are manged with suspense which takes loader component to fulfill delay
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
          element: (
            <Suspense fallback={<Loader />}>
              <CategoryDetails />
            </Suspense>
          ),
        },
        {
          path: "product/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <ProductDetails />
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loader />}>
              <Product />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "place_order",
          element: (
            <Suspense fallback={<Loader />}>
              <PlaceOrder />
            </Suspense>
          ),
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
