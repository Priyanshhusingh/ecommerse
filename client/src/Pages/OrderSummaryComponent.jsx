import React, { useContext } from "react";
import { UserContext } from "../UserContext";

function OrderSummaryComponent({ productQuantity, onNextStep, onPrevStep }) {
  const { user } = useContext(UserContext);
  const getTotalPrice = () => {
    let totalPrice = 0;
    user?.cart?.forEach((product) => {
      totalPrice += product.price;
    });
    return totalPrice.toFixed(2);
  };
  return (
    <div className="mx-auto max-w-md p-4 border rounded-md shadow-md mt-10">
      <div className="text-lg font-semibold mb-4 border-b-gray-50">
        <div className="flex justify-between items-center">
          <h2>Total Item: </h2>
          <h2>
            {productQuantity} <span>items</span>
          </h2>
        </div>
        <div className="flex justify-between items-center">
          <h2>Total Price: </h2>
          <h2>
            <span>$</span>
            {getTotalPrice()}
          </h2>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={onPrevStep}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={onNextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OrderSummaryComponent;
