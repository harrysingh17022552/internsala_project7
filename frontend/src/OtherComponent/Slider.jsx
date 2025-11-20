import { useEffect, useState } from "react";
import slider1 from "../assets/images/slider1.jpg";
import slider2 from "../assets/images/slider2.jpg";
import slider3 from "../assets/images/slider3.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
export default function Slider() {
  const [slider, setSlider] = useState({
    initialState: 0,
    slides: [slider1, slider2, slider3],
  });
  useEffect(() => {
    const intid = setInterval(() => {
      setSlider((prev) => ({
        ...prev,
        initialState:
          prev.initialState >= prev.slides.length - 1
            ? 0
            : prev.initialState + 1,
      }));
    }, 5000);
    return () => clearInterval(intid);
  }, []);
  return (
    <section className="w-full flex items-center justify-center">
      <div className="relative w-full flex items-center justify-center">
        <div className="relative w-full h-[92vh] overflow-hidden">
          <img
            className="w-full h-full animate-[visibleIn_1s_ease] bg-blend-overlay"
            src={slider.slides[slider.initialState]}
            alt="slider images"
          />
          <div className="absolute top-0 w-full h-full bg-black/70"></div>
        </div>
        <IoIosArrowForward
          className="absolute text-4xl text-[#eeae47] right-2 bg-[#31367e] rounded-full pl-1 cursor-pointer z-10"
          onClick={() =>
            setSlider((prev) => ({
              ...prev,
              initialState:
                prev.initialState >= prev.slides.length - 1
                  ? 0
                  : prev.initialState + 1,
            }))
          }
        />
        <IoIosArrowBack
          className="absolute text-4xl text-[#eeae47] left-2 bg-[#31367e] rounded-full pr-1 cursor-pointer z-10"
          onClick={() =>
            setSlider((prev) => ({
              ...prev,
              initialState:
                prev.initialState == 0
                  ? prev.slides.length - 1
                  : prev.initialState - 1,
            }))
          }
        />
        <div className="absolute flex flex-col items-center justify-start">
          <h1 className="mainhead font-bold">Welcome to My Store</h1>
          <p className="text-white w-2/3 lg:w-1/2 text-center text-xl hidden md:flex">
            Explore our hand-picked collections where exceptional quality meets
            mindful design. We offer everything you need to simplify your
            routines, elevate your space, and shop with confidence. Discover
            unique, durable products backed by dependable customer care and
            fast, easy shipping. Start your journey of discovery now and
            experience the difference of intentional shopping.
          </p>
        </div>
      </div>
    </section>
  );
}
