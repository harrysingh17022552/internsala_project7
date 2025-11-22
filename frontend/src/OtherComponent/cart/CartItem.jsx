import { MdDelete } from "react-icons/md";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
} from "../../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
export default function CartItem({ item, index }) {
  const dispatch = useDispatch();

  return (
    <article
      
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
        <strong className="text-[10px] sm:text-sm">{item.title}</strong>
        <small className="w-full text-[10px] sm:text-sm whitespace-nowrap">
          {item.description}
        </small>
        <div className="flex gap-2 items-center flex-wrap">
          <div title="Decease Quantity" className="flex gap-2 items-center">
            <button
              className="border w-4 flex items-center text-center justify-center rounded-full text-white bg-black text-[10px] font-extrabold cursor-pointer hover:scale-110 transition-all"
              onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
            >
              -
            </button>
            <strong className="border rounded-md w-6 text-[12px] flex items-center justify-center font-extrabold">
              {item.quantity}
            </strong>
            <button
              title="Increase Quantity"
              className="border w-4 flex items-center text-center justify-center rounded-full text-white bg-black text-[10px] font-extrabold cursor-pointer hover:scale-110 transition-all"
              onClick={() => dispatch(increaseQuantity({ id: item.id }))}
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
  );
}
