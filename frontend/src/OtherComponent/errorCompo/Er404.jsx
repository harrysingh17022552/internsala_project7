import { FaCircleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// Error boundary component for any unknown path
export default function Er404() {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-center w-full h-[90vh]">
      <article className="flex gap-4 items-center">
        <FaCircleLeft
          className="text-3xl text-blue-800 hover:scale-110 transition-all cursor-pointer"
          onClick={() => navigate("/")}
        />
        <strong className="text-red-500 md:text-2xl">
          404 : Path you are looking for, is not Available
        </strong>
      </article>
    </section>
  );
}
