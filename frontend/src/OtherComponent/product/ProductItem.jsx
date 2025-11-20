import { Link } from "react-router-dom";
export default function ProductItem({ item, index }) {
  return (
    <Link
      to={`/product/${item.id}`}
      className="relative flex flex-col rounded-md gap-2 border border-gray-300 w-[100px] max-w-[150px] sm:w-[150px] sm:max-w-[200px] shrink grow"
    >
      <img
        src={item.thumbnail}
        className="w-full"
        alt={`popular/item/${index}`}
      />
      <small className="absolute top-0 right-0 text-white w-fit py-1 px-3 bg-black text-[10px] rounded-l-sm">
        {item.rating} ★
      </small>
    </Link>
  );
}
