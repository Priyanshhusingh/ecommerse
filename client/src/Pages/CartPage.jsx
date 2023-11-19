import React, { useContext, useEffect, useState } from "react";
import { AddToCartUrl, ProductUrl } from "../UrlApi";

function CartPage({ product }) {
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    fetch(`${ProductUrl}/${product}`)
      .then((res) => res.json())
      .then((data) => setProductInfo(data));
  }, []);
  const RemoveProductCart = async () => {
    try {
      await fetch(`${AddToCartUrl}/${product}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {productInfo && (
        <div className="flex justify-between w-full shadow-md items-center h-28 align-middle rounded-md mb-3">
          <div className="flex gap-4 justify-center items-center bg-transparent h-28">
            <div>
              <img
                className="w-32 h-28 object-cover rounded-md "
                src={`http://localhost:8080/uploads/${productInfo.imageUrl[0]}`}
                alt=""
              />
            </div>
            <div>
              <h2>{productInfo.title}</h2>
              <p className="text-sm text-gray-500">{productInfo.description}</p>
            </div>
          </div>
          <div className="gap-2 flex">
            <button className="shadow-lg p-3 shadow-gray-500 rounded-md font-medium text-center hover:text-blue-600">
              ${productInfo.price}
            </button>
            <button
              className="shadow-lg p-3 shadow-gray-500 rounded-md font-medium text-center hover:text-red-600"
              onClick={RemoveProductCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
