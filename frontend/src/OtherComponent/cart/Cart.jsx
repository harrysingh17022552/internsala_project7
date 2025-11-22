import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
} from "../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem = useSelector((store) => store.cart.items);
  return (
    <section className="relative flex w-full h-full gap-8 pt-4 flex-col">
      <h2 className="self-center font-bold ">Cart Item's</h2>
      {cartItem.length > 0 ? (
        <>
          <article className="p-4 flex flex-col md:items-center gap-4">
            {cartItem.map((item, index) => (
              <article
                key={`cart/item/${index}`}
                className="flex justify-between gap-4 rounded-md border md:w-3/4 lg:w-1/2"
              >
                <div className="flex items-center">
                  <img
                    className="min-w-20 sm:max-w-30 sm:min-w-30 rounded-md"
                    src={item.thumbnail}
                    alt={`cartItem/image/${index}`}
                  />
                </div>
                <div className="flex flex-col gap-2 p-2 overflow-hidden justify-around sm:justify-between">
                  <strong className="text-[10px] sm:text-sm">
                    {item.title}
                  </strong>
                  <small className="w-full text-[10px] sm:text-sm whitespace-nowrap">
                    {item.description}
                  </small>
                  <div className="flex gap-2 items-center flex-wrap">
                    <div
                      title="Decease Quantity"
                      className="flex gap-2 items-center"
                    >
                      <button
                        className="border w-4 flex items-center text-center justify-center rounded-full text-white bg-black text-[10px] font-extrabold cursor-pointer hover:scale-110 transition-all"
                        onClick={() =>
                          dispatch(decreaseQuantity({ id: item.id }))
                        }
                      >
                        -
                      </button>
                      <strong className="border rounded-md w-6 text-[12px] flex items-center justify-center font-extrabold">
                        {item.quantity}
                      </strong>
                      <button
                        title="Increase Quantity"
                        className="border w-4 flex items-center text-center justify-center rounded-full text-white bg-black text-[10px] font-extrabold cursor-pointer hover:scale-110 transition-all"
                        onClick={() =>
                          dispatch(increaseQuantity({ id: item.id }))
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="flex text-[12px] items-center">
                      <strong>$</strong>
                      <strong>{(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
                <div
                  title="remove from cart"
                  className="flex bg-red-500 p-2 items-center justify-center cursor-pointer"
                  onClick={() => dispatch(deleteCartItem({ id: item.id }))}
                >
                  <MdDelete className="icon text-sm sm:text-xl text-white" />
                </div>
              </article>
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
