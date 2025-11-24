/* eslint-disable react-hooks/exhaustive-deps */
import ProductItemInDetail from "./ProductItemInDetail";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterItem } from "../../redux/slice/productSlice";
export default function ProductList({ allProduct }) {
  const dispatch = useDispatch();
  const getAllProduct = useSelector((store) => store.product.filterItems);

  // assigning fetch data from its parent to filter product state
  useEffect(() => {
    dispatch(filterItem({ key: allProduct }));
  }, [allProduct]);

  // state that store the search payload here
  const [searchValue, setSearchValue] = useState("");
  // use search payload and update the main product state, this function checks the payload with each item title and store it in main product state in redux store
  const handleChange = (key) => {
    dispatch(filterItem({ key }));
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
          onClick={() => handleChange(searchValue)}
        />
      </article>

      {/* map all product based on search payload here */}
      <article className="flex gap-4 flex-wrap p-4">
        {getAllProduct.length > 0 ? (
          getAllProduct.map((item, index) => (
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
