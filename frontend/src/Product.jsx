//This Component is parent of Product List Component, it fetch the data from the url and pass it to the product list as a props

// import { useSelector } from "react-redux";
import ProductList from "./OtherComponent/product/ProductList.jsx";
import { useEffect, useState } from "react";

//Created a custom hook to fetch data
import { FetchData } from "./customHooks/FetchData";
//Loader until data fetch
import Loader from "./Loader.jsx";
export default function Product() {
  // const [allProduct, setAllProduct] = useState(
  //   useSelector((store) => store.product.items)
  // );

  //states to store product received and to make loader active and inactive
  const [allProduct, setAllProduct] = useState([]);
  const [loader, setLoader] = useState(false);

  //useEffect, that fetches data every time when this component reloaded
  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const data = await FetchData(
        "https://dummyjson.com/products?limit=194",
        "GET"
      );
      //assigning response data to product state
      setAllProduct(data.products);
      setLoader(false);
    };
    getData();
  }, []);
  return loader ? <Loader /> : <ProductList allProduct={allProduct} />;
}
