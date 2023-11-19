import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegistrationPage.css";
import { Link, Navigate } from "react-router-dom";
import { registerUrl } from "../../UrlApi";

function RegistrationPage() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleUser = async (ev) => {
    setValue({ ...value, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value.password !== value.confirmPassword) {
      toast.warning("Passwords do not match!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
    } else {
      try {
        const response = await fetch(registerUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: value.name,
            email: value.email,
            password: value.password,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.error === "Email already exists") {
            toast.error("Email already exists. Please use a different email.");
          } else {
            toast.error("An error occurred. Please try again later.");
          }
        } else {
          setRedirect(true);
        }
      } catch (error) {
        toast.warning(error, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      }
    }
  };
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Create an Account
      </h1>
      <form
        className="mx-auto max-w-md bg-white p-8 rounded-md shadow-md animated-form"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex items-center">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            <i className="fas fa-user mr-2"></i>Full Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="John Doe"
            autoComplete="name"
            onChange={handleUser}
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            <i className="fas fa-envelope mr-2"></i>Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="john@example.com"
            autoComplete="email"
            onChange={handleUser}
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            <i className="fas fa-lock mr-2"></i>Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="********"
            autoComplete="new-password"
            onChange={handleUser}
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            <i className="fas fa-lock mr-2"></i>Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="********"
            onChange={handleUser}
            required
          />
        </div>

        <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300">
          Register
        </button>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default RegistrationPage;
