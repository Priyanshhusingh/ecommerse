import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddToCartUrl, ProductUrl } from "../UrlApi";
import { UserContext } from "../UserContext";
import { useContext } from "react";

function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`${ProductUrl}/${id}`)
      .then((resp) => resp.json())
      .then((data) => setProduct(data));
  }, [id]);
  const handleAddToCart = () => {
    if (user && product.productQuantity > 0) {
      fetch(`${AddToCartUrl}/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ price: product.price }),
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 border rounded-lg overflow-hidden">
          <img
            className="w-full h-auto md:h-full object-cover"
            src={`http://localhost:8080/uploads/${
              selectedImage || product?.imageUrl?.[0]
            }`}
            alt=""
          />
        </div>
        <div className="flex md:flex-col gap-4 md:overflow-y-auto md:max-h-96 sm:max-h-40 sm:overflow-y-hidden">
          {product?.imageUrl?.map((image) => (
            <img
              key={image}
              className="w-full sm:h-40 h-auto cursor-pointer rounded-lg object-cover"
              src={`http://localhost:8080/uploads/${image}`}
              onMouseOver={() => setSelectedImage(image)}
              alt=""
            />
          ))}
        </div>
      </div>
      <div className="mt-8 md:flex md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-lg mt-2 text-gray-600">{product.description}</p>
          <h2 className="text-2xl font-bold">${product.price}</h2>
        </div>
        <div className="flex justify-between md:flex-col md:mt-8 md:w-80 gap-2">
          <button className="shadow-sm shadow-gray-500 rounded-2xl p-3 hover:text-red-500">
            Buy Now
          </button>
          <button
            className="shadow-sm shadow-gray-500 rounded-2xl flex items-center justify-center p-3 gap-2 hover:text-red-500"
            onClick={handleAddToCart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {product.productQuantity > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
