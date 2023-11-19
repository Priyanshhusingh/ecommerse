import React, { useContext, useEffect, useState } from "react";
import { ProductWishListurl } from "../UrlApi";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

function ProductCard({ ...product }) {
  const [isInWishlist, setInWishlist] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const isContainWishlist = user?.wishist.includes(product._id);
    setInWishlist(isContainWishlist);
  }, [user?.wishist, product._id]);

  const handleWishlistToggle = () => {
    setInWishlist(!isInWishlist);

    fetch(ProductWishListurl, {
      method: isInWishlist ? "DELETE" : "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: product._id }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.success))
      .catch((error) => console.error("Error updating wishlist:", error));
  };

  return (
    <div className="relative mt-4 overflow-hidden rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg transition duration-300 ease-in-out">
      <Link to={`/product/${product._id}`}>
        <div className="relative group">
          <img
            className="w-full h-48 object-contain object-center group-hover:scale-110 transition duration-300 ease-in-out"
            src={`http://localhost:8080/uploads/${product.imageUrl[0]}`}
            alt={product.title}
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      </Link>
      <div
        className={`absolute top-2 right-2 cursor-pointer ${
          isInWishlist ? "text-red-500" : "text-gray-500"
        }`}
        onClick={handleWishlistToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isInWishlist ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </div>
    </div>
  );
}

export default ProductCard;
