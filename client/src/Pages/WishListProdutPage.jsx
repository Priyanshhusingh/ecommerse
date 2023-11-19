import React, { useContext, useEffect, useState } from "react";
import { ProductUrl } from "../UrlApi";

function WishListProdutPage({ product }) {
  const [productInfo, setProductInfo] = useState();
  
  useEffect(() => {
    fetch(`${ProductUrl}/${product}`)
      .then((res) => res.json())
      .then((data) => setProductInfo(data));
  }, []);
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
              <h2>${productInfo.price}</h2>
            </div>
          </div>
          <div>
            <button className="shadow-lg p-3 shadow-gray-500 rounded-md font-medium text-center hover:text-blue-600">
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishListProdutPage;
