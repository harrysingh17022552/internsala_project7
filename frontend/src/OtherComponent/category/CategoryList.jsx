import { Link } from "react-router-dom";
export default function CategoryList({ item, index }) {
  const color = ["#eac17d", "#45985d", "#2b2c75"];
  return (
    <Link
      style={{
        backgroundImage:
          index % 2 === 0
            ? `linear-gradient(to LEFT, #000000, ${color[index % 3]})`
            : `linear-gradient(to LEFT, ${color[index % 3]}, #000000)`,
      }}
      to={`category/${item.toLowerCase()}`}
      className={`p-2 px-4 rounded-xl h-[50px] max-w-fit md:w-[150px] md:h-[75px] md:max-w-[200px] cursor-pointer flex grow justify-center hover:scale-95 transition-all items-center border `}
    >
      <strong className="tracking-widest text-white md:text-xl">
        {item.toUpperCase()}
      </strong>
    </Link>
  );
}
