import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideNavBar from "./Pages/SideNavBar";
import ProductAdmin from "./Pages/AllProductUpdat";
import { PieChart } from "react-minimal-pie-chart";

function Admin() {
  const AdminRoute = useLocation();
  const [allProductAndUser, setAllProductandUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/all-user-product")
      .then((resp) => resp.json())
      .then((data) => setAllProductandUser(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <SideNavBar Route={AdminRoute} />

      <div className="flex-grow bg-gray-100 p-4 lg:p-6">
        {AdminRoute.pathname === "/admin" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white shadow-lg rounded-md p-4">
              <h2 className="text-lg lg:text-xl font-semibold mb-2">
                Total Number of Products
              </h2>
              <div className="text-2xl lg:text-3xl">
                {allProductAndUser.totalProducts}
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-md p-4">
              <h2 className="text-lg lg:text-xl font-semibold mb-2">
                Total Number of Users
              </h2>
              <div className="text-2xl lg:text-3xl">
                {allProductAndUser.totalUsers}
              </div>
            </div>
          </div>
        )}

        {AdminRoute.pathname === "/admin/product" && <ProductAdmin />}
      </div>
    </div>
  );
}

export default Admin;
