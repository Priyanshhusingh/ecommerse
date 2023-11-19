import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import CartPage from "./CartPage";
import { Link } from "react-router-dom";

function UserCartPage() {
  const { user } = useContext(UserContext);
  const getTotalPrice = () => {
    let totalPrice = 0;
    user?.cart?.forEach((product) => {
      totalPrice += product.price;
    });
    return totalPrice.toFixed(2);
  };

  return (
    <div>
      <div>
        {user?.cart?.length > 0 ? <h1>Your Cart Item</h1> : <h1>No items</h1>}
      </div>
      <div className="mt-10">
        {user?.cart?.map((product) => (
          <div key={product.productId}>
            <CartPage product={product.productId} />
          </div>
        ))}
        <div className="block md:flex justify-between items-center w-full p-3 shadow-md rounded-2xl">
          <Link to={"/booking"} className="mb-3 md:mb-0 md:mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy Now
          </Link>
          <h2 className="text-lg">Total Price : ${getTotalPrice()}</h2>
        </div>
      </div>
    </div>
  );
}

export default UserCartPage;
