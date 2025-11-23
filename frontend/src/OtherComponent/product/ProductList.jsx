import ProductItemInDetail from "./ProductItemInDetail";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ProductList({ allProduct }) {
  // main state, that keeps the product, initially it have all product, but whenever user search, it will update according search payload
  const [filteredProduct, setFilteredProduct] = useState([]);

  // assigning fetch data from its parent to filter product state
  useEffect(() => {
    setFilteredProduct(allProduct);
  }, [allProduct]);

  // state that store the search payload here
  const [searchValue, setSearchValue] = useState("");
  // use search payload and update the main product state, this function checks the payload with each item title and store it in main product state
  const handleChange = () => {
    setFilteredProduct(
      allProduct.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };
  return (
    <section className="w-full flex flex-col gap-8">
      {/* search bar which update search value state on every change */}
      <article className="flex pt-12 px-4 w-full justify-center items-center gap-2">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Item Here..."
          className="w-full sm:w-1/2 lg:w-1/3 p-2 rounded-xl border border-[#30347a] text-[#ff9900]"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <FaSearch
          className="icon text-2xl text-[#389952]"
          onClick={handleChange}
        />
      </article>

      {/* map all product based on search payload here */}
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
