// import { useSelector } from "react-redux";
import ProductList from "./OtherComponent/product/ProductList";
import { useEffect, useState } from "react";
import { FetchData } from "./customHooks/FetchData";
export default function Product() {
  // const [allProduct, setAllProduct] = useState(
  //   useSelector((store) => store.product.items)
  // );
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await FetchData(
        "https://dummyjson.com/products?limit=194",
        "GET"
      );
      setAllProduct(data.products);
    };
    getData();
  }, []);
  return <ProductList allProduct={allProduct} />;
}
