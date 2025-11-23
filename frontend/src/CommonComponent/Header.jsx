import { useSelector } from "react-redux";
import { list } from "../assets/myFunc/navlist";
import { Link } from "react-router-dom";

export default function Header({ screenSize }) {
  const cartItem = useSelector((store) => store.cart.items);
  return (
    <header className="sticky top-0 w-full py-2 px-4 flex gap-8 items-center border-b overflow-scroll noscrollbar border-gray-200 z-40 bg-white">
      <Link to={list[0].path}>
        <img
          className="min-w-[100px] h-[50px]"
          src={list[0].src}
          alt={list[0].name}
        />
      </Link>
      <article className="flex gap-8 items-cente grow">
        {list.slice(1, -1).map((item, index) => (
          <Link className="font-bold" to={item.path} key={`navlist/${index}`}>
            {item.name}
          </Link>
        ))}
      </article>
      {list.slice(-1).map((item) => (
        <Link
          className="relative flex justify-center"
          to={item.path}
          key={`navlist/cart`}
        >
          <item.icon className="text-4xl" />
          <strong className="absolute text-white mt-1 ml-2 text-sm animate-[fromTop_0.5s_ease]">
            {cartItem.length}
          </strong>
        </Link>
      ))}
    </header>
  );
}
