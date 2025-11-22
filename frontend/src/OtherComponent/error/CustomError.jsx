import { FaCircleLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

export default function CustomError() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <section className="flex items-center justify-center w-full h-[90vh]">
      <article className="flex gap-4 items-center">
        <FaCircleLeft
          className="text-3xl text-blue-800 hover:scale-110 transition-all cursor-pointer"
          onClick={() => navigate("/products")}
        />
        <strong className="text-red-500 md:text-2xl">{params.error}</strong>
      </article>
    </section>
  );
}
