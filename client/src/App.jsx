// App.js
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Layout from "./Layout";
import AllProductPage from "./Pages/AllProductPage";
import RegistrationPage from "./Pages/UserAuth/RegistrationPage";
import LoginPage from "./Pages/UserAuth/LoginPage";
import UserProfile from "./Pages/UserProfile";
import Admin from "./Admin";
import ProductForm from "./Pages/Admin/ProductForm";
import ProductInfo from "./Pages/ProductInfo";
import ProductAdmin from "./Pages/AllProductUpdat";
import WishListPage from "./Pages/WishListPage";
import UserCartPage from "./Pages/UserCartPage";
import BookingPage from "./Pages/BookingPage";
import UserAccountPage from "./Pages/UserAuth/UserAccountPage";
import SearchPage from "./Pages/SearchPage";

function App() {
  const { ready, user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllProductPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="//product/:id" element={<ProductInfo />} />

        <Route
          path="/admin/*"
          element={
            ready ? user?.admin ? <Admin /> : <Navigate to="/" replace /> : null
          }
        />
        <Route path="/admin/add-product" element={<ProductForm />} />
        <Route path="/admin/product/update/:id" element={<ProductForm />} />

        <Route path="/wish-list" element={<WishListPage />} />
        <Route path="/cart" element={<UserCartPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/user/account" element={<UserAccountPage />} />
        <Route path="/search/:searchQuery" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
