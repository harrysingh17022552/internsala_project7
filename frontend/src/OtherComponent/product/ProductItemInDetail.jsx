/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useOutletContext } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slice/cartSlice";
import { useEffect } from "react";
import LazyImage from "../../LazyImage.jsx";
export default function ProductItemInDetail({ item }) {
  // for popup message
  const handleNewMessage = useOutletContext();

  const dispatch = useDispatch();

  // get cartItem from redux store and make button disable for every that item which is in cart, this will prevent from duplicates in cart item array
  const cartItem = useSelector((store) => store.cart.items);
  useEffect(() => {
    for (let i = 0; i < cartItem.length; i++) {
      const id = `addToCart/button/${cartItem[i].id}`;
      if (document.getElementById(id)) {
        document.getElementById(id).disabled = true;
      }
    }
  }, []);

  // this function uses action and dispatch to dispatch this action with current payload to the redux store
  // this add the item to the cart
  const handleAddCart = (e, item) => {
    // disable add to cart button after 1st click to prevent it from repetition
    e.currentTarget.disabled = true;
    dispatch(addItem(item));
    handleNewMessage(`Added ${item.title.slice(0, 8)}... in Cart`);
  };

  //this component use lazyimage component for image lazy load
  // and every product have add to cart and buy now button, and on click product will take them to their detail page
  return (
    <div className="flex flex-col gap-2 justify-between border border-gray-300 shadow-[0px_0px_5px_0px_#4aaa5c_inset] rounded-md w-[100px] max-w-[150px] sm:w-[150px] sm:max-w-[200px] lg:w-[180px] lg:max-w-[230px] grow">
      <Link to={`/product/${item.id}`}>
        <LazyImage className='p-2' src={item.thumbnail} alt={`product/${item.id}/thumbnail`} />
      </Link>
      <article className="p-2 flex flex-col gap-2">
        <h3 className="w-full text-sm lg:text-[16px] text-center whitespace-nowrap overflow-hidden">
          {item.title}
        </h3>
        <i className="text-sm lg:text-[16px] text-center whitespace-nowrap">$ {item.price}</i>
        <div className="flex flex-nowrap gap-2 justify-around">
          <button
            id={`addToCart/button/${item.id}`}
            className="border border-gray-300 shadow-[0px_0px_5px_0px_#efac44_inset] rounded-md p-2 flex justify-center items-center w-[21px] grow max-w-[50px] md:max-w-[81px] cursor-pointer hover:scale-80 transition-all duration-500"
            onClick={(e) => handleAddCart(e, item)}
          >
            <FaShoppingBag className="icon" />
          </button>
          <div className="border border-gray-300 shadow-[0px_0px_5px_0px_#efac44_inset] rounded-md p-2 flex justify-center items-center w-[21px] grow max-w-[50px] md:max-w-[81px] cursor-pointer hover:scale-80 transition-all duration-500">
            <AiFillThunderbolt className="icon" />
          </div>
        </div>
      </article>
    </div>
  );
}
