/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import ProductList from "./OtherComponent/product/ProductList";
import { useState } from "react";
export default function Product() {
  const [allProduct, setAllProduct] = useState(
    useSelector((store) => store.product.items)
  );
  return <ProductList allProduct={allProduct} />;
}
