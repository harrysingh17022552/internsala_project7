import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
export default function Cart() {
  const navigate = useNavigate();
  const cartItem = useSelector((store) => store.cart.items);
  return (
    <section className="relative flex w-full h-full gap-8 pt-4 flex-col">
      <h2 className="self-center font-bold ">Cart Item's</h2>
      {cartItem.length > 0 ? (
        <>
          <article className="p-4 flex flex-col md:items-center gap-4">
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
