/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
const PLACEHOLDER_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

//This Component is used for lazy image loading
//This Component initially takes gray image in every image src
//And whenever the image comes under screen and that can be detect with the help observer, after that the original src is allocated to the image
//Doing this will speedup that page because image loads only when user scroll down, and this will prevent page from loading longer

export default function LazyImage({ src, alt, ...props }) {
  const [imageSrc, setImageSrc] = useState(PLACEHOLDER_SRC);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);

  //useEffect for observer to catch up images coming under screen
  useEffect(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px 0px 0px 0px",
        }
      );

      if (imageRef.current) {
        observer.observe(imageRef.current);
      }

      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    } else {
      setImageSrc(src);
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      onLoad={() => {
        setIsLoaded(true);
      }}
      {...props}
    />
  );
}
