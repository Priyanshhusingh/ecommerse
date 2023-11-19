import React, { useState } from "react";
import AddressComponent from "./AddressComponent";
import OrderSummaryComponent from "./OrderSummaryComponent";
import PaymentComponent from "./PaymentComponent";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { AddressUrl, BookingOrderUrl } from "../UrlApi";
import { ToastContainer, toast } from "react-toastify";

function BookingPage() {
  const { user } = useContext(UserContext);
  const productQuantity = user?.cart?.length;
  const [values, setValues] = useState({
    name: user?.name || "",
    street: "",
    number: "",
    country: "",
    region: "",
    isDefault: false,
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep !== 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(AddressUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast.success("Address Successfully Added", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
        handleNextStep();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOrder = async () => {
    try {
      await fetch(BookingOrderUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productQuantity, ProductId: user.cart }),
      });
    } catch (error) {
      console.error("Error occurred while handling the order:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div
          className={`shadow-md p-3 rounded-xl mb-4 md:mb-0 ${
            currentStep >= 1 ? "bg-blue-500" : ""
          }`}
        >
          Adress
        </div>
        <div className="w-full h-2 bg-gray-100 md:w-40 md:h-2"></div>
        <div
          className={`shadow-md p-3 rounded-xl mb-4 md:mb-0 ${
            currentStep >= 2 ? "bg-blue-500" : ""
          }`}
        >
          OrderSummary
        </div>
        <div className="w-full h-2 bg-gray-100 md:w-40 md:h-2"></div>
        <div
          className={`shadow-md p-3 rounded-xl mb-4 md:mb-0 ${
            currentStep === 3 ? "bg-blue-500" : ""
          }`}
        >
          Payment
        </div>
      </div>

      <div>
        {currentStep === 1 && (
          <AddressComponent
            onNextStep={handleNextStep}
            handleAddressSubmit={handleAddressSubmit}
            {...values}
            setValues={setValues}
          />
        )}
        {currentStep === 2 && (
          <OrderSummaryComponent
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            productQuantity={productQuantity}
          />
        )}
        {currentStep === 3 && (
          <PaymentComponent
            onPrevStep={handlePrevStep}
            handleOrder={handleOrder}
          />
        )}
      </div>
    </div>
  );
}

export default BookingPage;
