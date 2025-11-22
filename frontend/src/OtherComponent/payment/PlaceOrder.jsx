/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { flushCart } from "../../redux/slice/cartSlice";
import { addUserInfo } from "../../redux/slice/userSlice";
export default function PlaceOrder() {
  const cartItem = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorRef = useRef(null);
  const getUserInfo = useSelector((store) => store.user.userInfo);
  const [userInfo, setUserInfo] = useState(
    getUserInfo
      ? getUserInfo
      : {
          first_name: "",
          last_name: "",
          email: "",
          mobile_no: "",
          address: "",
        }
  );
  useEffect(() => {
    if (cartItem.length <= 0) {
      navigate("/products");
    }
  }, []);
  const handleProceed = () => {
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const MOBILE_REGEX = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    errorRef.current.textContent =
      userInfo.first_name.length > 2
        ? userInfo.last_name.length > 2
          ? EMAIL_REGEX.test(userInfo.email)
            ? MOBILE_REGEX.test(userInfo.mobile_no)
              ? userInfo.address.length > 10
                ? null
                : "Invalid Address, try to write complete address"
              : "Invalid Mobile Number !"
            : "Invalid Email !"
          : "Please Enter Last Name !"
        : "Please Enter First Name !";

    if (!errorRef.current.textContent) {
      dispatch(addUserInfo({ userInfo: userInfo }));
      dispatch(flushCart());
      alert("Successfully Placed Order");
      navigate("/products");
    }
  };
  return (
    <section className="flex flex-col items-center w-full p-4 gap-8">
      <article className="flex flex-wrap md:flex-nowrap justify-center gap-20 pt-12">
        <article className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="relative flex flex-col w-full">
              <label
                htmlFor="fname"
                className="bg-white w-fit ml-3 z-1 -mb-3 after:content-['*'] after:text-red-500"
              >
                First Name
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                value={userInfo.first_name}
                className="border border-gray-200 p-2 rounded-xl w-full"
                required
                autoComplete="on"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative flex flex-col w-full">
              <label
                htmlFor="lname"
                className="bg-white w-fit ml-3 z-1 -mb-3 after:content-['*'] after:text-red-500"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                value={userInfo.last_name}
                className="border border-gray-200 p-2 rounded-xl w-full"
                required
                autoComplete="on"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative flex flex-col w-full">
              <label
                htmlFor="email"
                className="bg-white w-fit ml-3 z-1 -mb-3 after:content-['*'] after:text-red-500"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userInfo.email}
                className="border border-gray-200 p-2 rounded-xl w-full"
                required
                autoComplete="on"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative flex flex-col w-full">
              <label
                htmlFor="mobile"
                className="bg-white w-fit ml-3 z-1 -mb-3 after:content-['*'] after:text-red-500"
              >
                Mobile no.
              </label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                value={userInfo.mobile_no}
                className="border border-gray-200 p-2 rounded-xl w-full"
                required
                autoComplete="on"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    mobile_no: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="relative flex flex-col w-full">
            <label
              htmlFor="address"
              className="bg-white w-fit ml-3 z-1 -mb-3 after:content-['*'] after:text-red-500"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={userInfo.address}
              className="border border-gray-200 p-2 rounded-xl w-full"
              required
              autoComplete="on"
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
          </div>
          <div className="relative flex flex-col w-full">
            <label htmlFor="message" className="bg-white w-fit ml-3 z-1 -mb-3">
              Message <small>(optional)</small>
            </label>
            <textarea
              name="message"
              id="message"
              className="border border-gray-200 p-2 rounded-xl w-full"
              autoComplete="on"
            ></textarea>
          </div>
        </article>
        <article className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            {cartItem.slice(0, 4).map((item, index) => (
              <div
                className={`relative w-18 h-18 border bg-white -ml-10 flex justify-center rounded-full`}
                key={`placeOrder/item/${index}`}
              >
                <img
                  className="w-full object-cover object-center scale-80"
                  src={item.thumbnail}
                  alt={`item/${index}`}
                />
                <small className="absolute -top-2 bg-gray-400 w-5 h-5 rounded-full flex justify-center items-center text-[10px] text-white font-extrabold">
                  {item.quantity}
                </small>
              </div>
            ))}
            <p className="text-gray-400">
              {cartItem.length > 4
                ? `+${cartItem
                    .slice(4)
                    .reduce((acc, curr) => acc + curr.quantity, 0)} more`
                : `${cartItem.reduce(
                    (acc, curr) => acc + curr.quantity,
                    0
                  )} items`}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row border-b border-[#f0af49]">
              <div className="flex items-center">
                <strong className="text-[#3a9b4f]">+</strong>
              </div>
              <div className="grid grow grid-cols-2 text-right">
                <p className="pr-2 whitespace-nowrap">Total : </p>
                <p>
                  ₹
                  {cartItem
                    .reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
                    .toFixed(2)}
                </p>
                <p className="pr-2 whitespace-nowrap">CGST : </p>
                <p>9%</p>
                <p className="pr-2 whitespace-nowrap">SGST : </p>
                <p>9%</p>
              </div>
            </div>
            <div className="flex flex-col border-b border-[#f0af49]">
              <div className="grid grid-cols-2 text-right py-1">
                <p className="whitespace-nowrap">Grand Total : </p>
                <p>
                  ₹
                  {(
                    cartItem.reduce(
                      (acc, curr) => acc + curr.quantity * curr.price,
                      0
                    ) +
                    cartItem.reduce(
                      (acc, curr) => acc + curr.quantity * curr.price,
                      0
                    ) *
                      (18 / 100)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </article>
      </article>
      <strong className="text-red-500 text-sm" ref={errorRef}></strong>
      <button
        className="rounded-md border py-1 px-3 cursor-pointer hover:scale-95 font-extrabold transition-all bg-radial-[at_0%_75%] from-white to-[#ecaf48] to-90%"
        onClick={handleProceed}
      >
        Proceed to Pay
      </button>
    </section>
  );
}
