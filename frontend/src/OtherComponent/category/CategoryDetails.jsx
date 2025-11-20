/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import ProductList from "../product/ProductList";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function CategoryDetails() {
  const params = useParams();
  const [allProduct, setAllProduct] = useState(
    useSelector((store) => store.product.items).filter(
      (item) => item.category == params.category
    )
  );
  return <ProductList allProduct={allProduct} />;
}
