/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IoPricetagSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { addItem } from "../../redux/slice/cartSlice";
export default function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState(
    useSelector((store) => store.product.items).filter(
      (item) => item.id == params.id
    )
  );
  const cartItem = useSelector((store) => store.cart.items);
  useEffect(() => {
    for (let i = 0; i < cartItem.length; i++) {
      if (cartItem[i].id == params.id) {
        document.getElementById("detailATC").disabled = true;
      }
    }
  }, []);
  const handleATC = (e, item) => {
    e.currentTarget.disabled = true;
    dispatch(addItem(item));
  };
  const [showDetails, setShowDetails] = useState(false);
  return (
    <section className="w-full flex flex-col pt-4">
      {currentProduct.length > 0 ? (
        currentProduct.map((item) => (
          <article
            key={`product/detail/${item.id}`}
            className="flex flex-col gap-4"
          >
            <article className="px-4 space-y-3">
              <div className="flex flex-col gap-2 float-left">
                <img
                  className="w-[300px] float-left hover:scale-200 transition-all"
                  src={item.images[0]}
                  alt={`product/image/${item.id}`}
                />

                <div className="flex gap-2 justify-around">
                  {item.images.map((pics, index) => (
                    <img
                      id="imagesets"
                      key={`product/${item.id}/imageSet/${index}`}
                      src={pics}
                      alt=""
                      className={`${index==0 && 'border'} w-12 h-12 cursor-pointer rounded-md`}
                      onClick={(e) => {
                        const curimg = document.querySelectorAll("#imagesets");
                        for (let i = 0; i < curimg.length; i++) {
                          curimg[i].style.border = "unset";
                          curimg[i].style.boxShadow = "unset";
                        }
                        e.currentTarget.parentElement.parentElement.childNodes[0].setAttribute(
                          "src",
                          pics
                        );
                        e.currentTarget.style.border = "1px solid gray";
                        e.currentTarget.style.boxShadow =
                          "0px 0px 8px 0px gray inset";
                      }}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p>{item.description}</p>
              <div className="flex gap-4 items-center">
                {item.tags.map((inthere, index) => (
                  <p
                    key={`product/${item.id}/tag/${index}`}
                    className="flex gap-2 items-center border rounded-xl px-2"
                  >
                    <IoPricetagSharp /> <span>{inthere}</span>
                  </p>
                ))}
              </div>
              <p
                className={`${
                  item.stock > 0 ? "text-green-500" : "text-red-500"
                } text-sm`}
              >
                In Stock : {item.stock}
              </p>
              <p className="flex gap-1 items-center flex-wrap">
                Price :
                <span className="line-through">
                  ₹{(item.price + item.discountPercentage / 100).toFixed(2)}
                </span>
                <span>₹{item.price}</span>
                <span className="border rounded-xl px-2 text-sm shadow-[0px_0px_15px_0px_green_inset] flex gap-1">
                  <span>Save</span>₹
                  {(
                    (item.price + item.discountPercentage / 100).toFixed(2) -
                    item.price
                  ).toFixed(2)}
                </span>
              </p>
              <div className="flex gap-2 items-center">
                <button
                  id="detailATC"
                  className="py-1 px-4 rounded-md border shadow-[0px_0px_15px_0px_blue_inset] hover:scale-95 transition-all cursor-pointer"
                  onClick={(e) => handleATC(e, item)}
                >
                  Add to Cart
                </button>
                <button className="py-1 px-4 rounded-md border shadow-[0px_0px_15px_0px_#ecad41_inset] hover:scale-95 transition-all cursor-pointer">
                  Buy Now
                </button>
              </div>
              <div className="flex flex-col w-full">
                <strong className="relative flex items-center">
                  <span className="bg-white text-xl flex gap-1 items-center">
                    {showDetails ? "Hide Details" : "More Details"}
                    <IoMdArrowDropdown
                      className={`text-xl icon ${
                        showDetails ? "rotate-180" : "rotate-0"
                      }`}
                      onClick={() => setShowDetails(!showDetails)}
                    />
                  </span>{" "}
                  <p className="w-full absolute border-b-3 border-gray-200 -z-1"></p>
                </strong>
                {showDetails && (
                  <ul className="list-disc list-outside animate-[visibleIn_1s_ease] pl-4">
                    <li>Brand : {item.brand || item.category}</li>
                    <li>Weight : {item.weight}</li>
                    <li>
                      Dimensions (W x H X D) : {item.dimensions.width} x{" "}
                      {item.dimensions.height} x {item.dimensions.depth}
                    </li>
                    <li>Warranty Information : {item.warrantyInformation}</li>
                    <li>Shipping Information : {item.shippingInformation}</li>
                    <li>SKU : {item.sku}</li>
                    <li>Return Policy : {item.returnPolicy}</li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col">
                <strong className="flex relative items-center justify-center">
                  <span className="w-fit text-xl py-4 bg-white">
                    Feedback & Reviews ({item.reviews.length})
                  </span>
                  <p className="w-full border-b-3 border-gray-200 absolute -z-1"></p>
                </strong>
                <article className="flex flex-col gap-4">
                  {item.reviews.map((review, index) => (
                    <div
                      key={`product/${item.id}/review/${index}`}
                      className="flex flex-col pb-4 border-b border-gray-200"
                    >
                      <div className="flex flex-wrap sm:flex-nowrap justify-between">
                        <div className="flex flex-col">
                          <strong>{review.reviewerName}</strong>
                          <p>{review.reviewerEmail}</p>
                        </div>
                        <div className="flex items-start">
                          <p>{review.date.slice(0, 10)}</p>
                        </div>
                      </div>
                      <p>
                        Rating : {review.rating}/5
                        <span className="text-yellow-500">★</span>
                      </p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </article>
              </div>
            </article>
          </article>
        ))
      ) : (
        <strong className="p-4 w-full text-center text-red-500">
          No Such Product Found !
        </strong>
      )}
    </section>
  );
}
