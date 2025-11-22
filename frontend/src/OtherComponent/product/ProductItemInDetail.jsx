/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slice/cartSlice";
import { useEffect } from "react";
import LazyImage from "../../LazyImage";
export default function ProductItemInDetail({ item }) {
  const cartItem = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    for (let i = 0; i < cartItem.length; i++) {
      const id = `addToCart/button/${cartItem[i].id}`;
      if (document.getElementById(id)) {
        document.getElementById(id).disabled = true;
      }
    }
  }, []);
  const handleAddCart = (e, item) => {
    e.currentTarget.disabled = true;
    dispatch(addItem(item));
  };
  return (
    <div className="flex flex-col gap-2 justify-between border border-gray-300 shadow-[0px_0px_10px_0px_gray_inset] rounded-md w-[100px] max-w-[150px] sm:w-[150px] sm:max-w-[200px] lg:w-[180px] lg:max-w-[230px] grow">
      <Link to={`/product/${item.id}`}>
        <LazyImage src={item.thumbnail} alt={`product/${item.id}/thumbnail`} />
      </Link>
      <article className="p-2 flex flex-col gap-2">
        <h1 className="w-full text-sm lg:text-xl text-center whitespace-nowrap overflow-hidden">
          {item.title}
        </h1>
        <div className="flex flex-nowrap gap-2 justify-around">
          <button
            id={`addToCart/button/${item.id}`}
            className="border border-gray-300 shadow-[0px_0px_5px_0px_gray_inset] rounded-md p-2 flex justify-center items-center w-[21px] grow max-w-[50px] md:max-w-[81px] cursor-pointer"
            onClick={(e) => handleAddCart(e, item)}
          >
            <FaShoppingBag className="icon" />
          </button>
          <div className="border border-gray-300 shadow-[0px_0px_5px_0px_gray_inset] rounded-md p-2 flex justify-center items-center w-[21px] grow max-w-[50px] md:max-w-[81px] cursor-pointer">
            <AiFillThunderbolt className="icon" />
          </div>
        </div>
      </article>
    </div>
  );
}
