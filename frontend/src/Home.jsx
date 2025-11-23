import { useSelector } from "react-redux";
import Slider from "./OtherComponent/Slider";
import CategoryList from "./OtherComponent/category/categoryList";
import ProductItem from "./OtherComponent/product/ProductItem";
export default function Home() {
  //Normal Home Component that have one slider, listed all category and list all popular products which is sorted w.r.t rating
  const product = useSelector((store) => store.product.items);
  return (
    <section className="flex flex-col gap-8 w-full">
      {/* slider */}
      <Slider />
      {/* Shop by category */}
      {/* filter all category from the array of products, now there will be duplicate, so used 'SET' to removed duplicates from it and then listed all unique categories */}
      <article className="flex flex-col gap-4 p-4">
        <h2 className="pl-2">Shop by Category</h2>
        <article className="flex gap-4 flex-wrap">
          {product.length > 0 ? (
            [...new Set(product.map((item) => item.category))].map(
              (item, index) => (
                <CategoryList
                  key={`listCategory/${index}`}
                  item={item}
                  index={index}
                />
              )
            )
          ) : (
            <strong className="text-red-500 text-center pl-4">
              No Category Found !
            </strong>
          )}
        </article>
      </article>
      {/* shop by popularity */}

      {/* sorted over rating */}
      <article className="flex flex-col gap-4 p-4">
        <h2 className="pl-2">Popular Products</h2>
        <article className="flex gap-2 flex-wrap">
          {product.length > 0 ? (
            [...product]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 9)
              .map((item, index) => (
                <ProductItem
                  key={`popular/product/${index}`}
                  item={item}
                  index={index}
                />
              ))
          ) : (
            <strong className="text-red-500 text-center pl-4">
              No Products Found !
            </strong>
          )}
        </article>
      </article>
    </section>
  );
}
