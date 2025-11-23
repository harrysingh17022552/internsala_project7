import { useSelector } from "react-redux";
import { list } from "../assets/myFunc/navlist";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Header({ screenSize }) {
  const [openNav, setOpenNav] = useState(false);
  const NavRef = useRef(null);
  useEffect(() => {
    openNav
      ? NavRef.current.classList.add("myNav")
      : NavRef.current.classList.remove("myNav");
  }, [openNav]);
  const cartItem = useSelector((store) => store.cart.items);
  return (
    <header className="sticky top-0 w-full py-2 px-4 flex gap-8 items-center justify-between border-b border-gray-200 z-40 bg-white">
      <>
        {/* three lines */}
        {screenSize.width <= 720 ? (
          <>
            <div
              ref={NavRef}
              className="relative flex flex-col justify-center w-8 h-8 gap-2 cursor-pointer animate-[visibleIn_1s_ease]"
              onClick={() => setOpenNav(!openNav)}
            >
              <p
                id="first"
                className="w-8 border-b-4 border-[#2d3382] rounded-r-md transition-all duration-500"
              ></p>
              <p
                id="second"
                className="w-6 border-b-4 border-[#eaae46] rounded-r-md transition-all duration-500"
              ></p>
              <p
                id="third"
                className="w-8 border-b-4 border-[#409b55] rounded-r-md transition-all duration-500"
              ></p>
            </div>
            <Link to={list[0].path}>
              <img
                className="min-w-[100px] h-[50px]"
                src={list[0].src}
                alt={list[0].name}
              />
            </Link>
            {openNav && (
              <article className="fixed top-16 left-0 bg-white flex flex-col items-center p-4 gap-4 rounded-b-xl animate-[fromTop_1s_ease] border-b border-r w-32">
                {list.slice(1, -1).map((item, index) => (
                  <Link
                    className="font-bold"
                    to={item.path}
                    key={`min/navlist/${index}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </article>
            )}
          </>
        ) : (
          <>
            <Link to={list[0].path}>
              <img
                className="min-w-[100px] h-[50px]"
                src={list[0].src}
                alt={list[0].name}
              />
            </Link>
            <article className="flex gap-8 items-center grow animate-[fromLeft_1s_ease]">
              {list.slice(1, -1).map((item, index) => (
                <Link
                  className="font-bold"
                  to={item.path}
                  key={`max/navlist/${index}`}
                >
                  {item.name}
                </Link>
              ))}
            </article>
          </>
        )}

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
      </>
    </header>
  );
}
