import { useSelector } from "react-redux";
import Slider from "./OtherComponent/Slider";
import CategoryList from "./OtherComponent/category/categoryList";
import ProductItem from "./OtherComponent/product/ProductItem";
export default function Home() {
  const product = useSelector((store) => store.product.items);
  return (
    <section className="flex flex-col gap-8 w-full">
      {/* slider */}
      <Slider />
      {/* Shop by category */}
      <article className="flex flex-col gap-4 p-4">
        <h2 className="pl-2">Shop by Category</h2>
        <article className="flex gap-4 flex-wrap">
          {[...new Set(product.map((item) => item.category))].map(
            (item, index) => (
              <CategoryList
                key={`listCategory/${index}`}
                item={item}
                index={index}
              />
            )
          )}
        </article>
      </article>
      {/* shop by popularity */}
      <article className="flex flex-col gap-4 p-4">
        <h2 className="pl-2">Popular Products</h2>
        <article className="flex gap-2 flex-wrap">
          {[...product]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 9)
            .map((item, index) => (
              <ProductItem
                key={`popular/product/${index}`}
                item={item}
                index={index}
              />
            ))}
        </article>
      </article>
    </section>
  );
}
