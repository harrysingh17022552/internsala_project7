import { useRef, useState, useEffect } from "react";
const PLACEHOLDER_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

export default function LazyImage({ src, alt, ...props }) {
  const [imageSrc, setImageSrc] = useState(PLACEHOLDER_SRC);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);
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
