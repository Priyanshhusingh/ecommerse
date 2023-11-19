import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AllproductsUrl } from "../UrlApi";
import { Link } from "react-router-dom";
import SideNavBar from "./SideNavBar";

function AllProductPage() {
  const [showAllproduct, setShowAllProduct] = useState([]);
  useEffect(() => {
    fetch(AllproductsUrl)
      .then((res) => res.json())
      .then((data) => setShowAllProduct(data));
  }, []);
  return (
    <div className="grid grid-cols-[1fr_3fr] h-screen ">
      <div className="w-48 bg-gray-300 rounded-none">
        <SideNavBar />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 bg-gray-100 p-6 grid-cols-1">
        {showAllproduct.map((product) => (
          <ProductCard {...product} key={product._id} />
        ))}
      </div>{" "}
    </div>
  );
}

export default AllProductPage;
