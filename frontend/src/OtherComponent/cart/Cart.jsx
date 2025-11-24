import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

import CartItem from "./CartItem";
export default function Cart() {
  const navigate = useNavigate();
  //get all items from the cart
  const cartItem = useSelector((store) => store.cart.items);
  // this component list that items here and get total price of this items and button to place order, grand total of item will be done on next step
  return (
    <section className="relative flex w-full h-full pt-4 flex-col">
      <h2 className="self-center font-bold flex gap-2 items-center">
        <IoMdHome
          className="text-4xl mb-2 text-[#454c82] cursor-pointer"
          onClick={() => navigate("/")}
        />
        Cart Item's
      </h2>
      {cartItem.length > 0 ? (
        <>
          <article className="p-4 flex flex-col md:items-center gap-4 pb-24">
            {cartItem.map((item, index) => (
              <CartItem key={`cart/item/${index}`} item={item} index={index} />
            ))}
          </article>
          <article className="w-full fixed bottom-0 p-3 text-white font-bold md:px-8 bg-[#389b55] flex items-center justify-between">
            <p>
              # Item ({cartItem.reduce((acc, curr) => acc + curr.quantity, 0)})
              = $
              {cartItem
                .reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
                .toFixed(2)}
            </p>
            <button
              className="py-1 rounded-xl px-3 border font-light shadow-[0px_0px_10px_5px_#efac44_inset] hover:scale-110 transition-all cursor-pointer"
              onClick={() => navigate("/place_order")}
            >
              Place Order
            </button>
          </article>
        </>
      ) : (
        <strong className="text-red-500 text-xl text-center">
          No Item added yet to cart !
        </strong>
      )}
    </section>
  );
}
