// import { useSelector } from "react-redux";
import ProductList from "./OtherComponent/product/ProductList";
import { useEffect, useState } from "react";
import { FetchData } from "./customHooks/FetchData";
import Loader from "./Loader";
export default function Product() {
  // const [allProduct, setAllProduct] = useState(
  //   useSelector((store) => store.product.items)
  // );
  const [allProduct, setAllProduct] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const data = await FetchData(
        "https://dummyjson.com/products?limit=194",
        "GET"
      );
      setAllProduct(data.products);
      setLoader(false);
    };
    getData();
  }, []);
  return loader ? <Loader /> : <ProductList allProduct={allProduct} />;
}
