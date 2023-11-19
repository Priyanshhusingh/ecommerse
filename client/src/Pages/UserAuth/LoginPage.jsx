import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegistrationPage.css";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { LoginUrl } from "../../UrlApi";

function LoginPage() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const { setUser, user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const handleUser = (ev) => {
    setValue({ ...value, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(LoginUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setRedirect(true);
        alert("login successfull");
      } else {
        alert("login failed");
      }
    } catch (error) {
      toast.warning(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Sign In</h1>
      <form
        className="mx-auto max-w-md bg-white p-8 rounded-md shadow-md animated-form"
        onSubmit={handleSubmit}
      >
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

        <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300">
          Login
        </button>

        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            register here
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
