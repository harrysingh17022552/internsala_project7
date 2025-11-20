import { useSelector } from "react-redux";
import ProductItemInDetail from "./ProductItemInDetail";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function ProductList() {
  const [allProduct, setAllProduct] = useState(
    useSelector((store) => store.product.items)
  );
  const [filteredProduct, setFilteredProduct] = useState(allProduct);
  const [searchValue, setSearchValue] = useState("");
  const handleChange = () => {
    setFilteredProduct(
      allProduct.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };
  return (
    <section className="w-full flex flex-col gap-8">
      <article className="flex pt-12 px-4 w-full justify-center items-center gap-2">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Item Here..."
          className="w-full sm:w-1/2 lg:w-1/3 p-4 rounded-xl border border-[#30347a] text-[#efac44]"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <FaSearch
          className="icon text-2xl text-[#389952]"
          onClick={handleChange}
        />
      </article>
      <article className="flex gap-4 flex-wrap p-4">
        {filteredProduct.length > 0 ? (
          filteredProduct.map((item, index) => (
            <ProductItemInDetail key={`product/${index}`} item={item} />
          ))
        ) : (
          <strong className="w-full text-center text-red-500">
            Product's Not Found !
          </strong>
        )}
      </article>
    </section>
  );
}
