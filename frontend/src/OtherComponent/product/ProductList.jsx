import { useSelector } from "react-redux";
import ProductItemInDetail from "./ProductItemInDetail";
export default function ProductList() {
  const product = useSelector((store) => store.product.items);
  return (
    <section className="w-full flex flex-col gap-8">
      <article className="flex gap-4 flex-wrap p-4">
        {product.map((item,index) => (
          <ProductItemInDetail
            key={`product/${index}`}
            item={item}
          />
        ))}
      </article>
    </section>
  );
}
