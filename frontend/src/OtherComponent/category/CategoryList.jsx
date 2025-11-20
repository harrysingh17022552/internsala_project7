import { Link } from "react-router-dom";
export default function CategoryList({ item, index }) {
  const color = ["#2b2c75", "#45985d", "#eac17d"];
  return (
    <Link
      to={`category/${item.toLowerCase()}`}
      className={`p-2 rounded-xl w-[200px] h-[100px] cursor-pointer flex grow justify-center hover:scale-95 transition-all items-center border ${
        index % 2 == 0
          ? `bg-linear-to-r/srgb from-black to-[${color[index % 3]}]`
          : `bg-linear-to-r/srgb from-[${color[index % 3]}] to-black`
      }`}
    >
      <strong className="tracking-widest text-white text-xl">
        {item.toUpperCase()}
      </strong>
    </Link>
  );
}
