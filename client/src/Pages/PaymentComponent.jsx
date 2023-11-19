import React, { useState } from "react";

function PaymentComponent({ onPrevStep, handleOrder }) {
  const [cod, setCod] = useState(false);

  const handleCodChange = (e) => {
    setCod(!cod);
  };

  return (
    <div className="mx-auto max-w-md p-4 border rounded-md shadow-md mt-10">
      <div className="text-lg font-semibold mb-4">
        <div
          className={`p-3 shadow-md rounded-md cursor-pointer ${
            cod ? "border border-gray-700" : ""
          }`}
        >
          <label
            htmlFor="codCheckbox"
            className="cursor-pointer flex items-center"
          >
            <input
              id="codCheckbox"
              type="checkbox"
              checked={cod}
              className="mr-2 cursor-pointer"
              onChange={handleCodChange}
            />
            Cash on Delivery
          </label>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={onPrevStep}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleOrder}
        >
          Place Your Order
        </button>
      </div>
    </div>
  );
}

export default PaymentComponent;
