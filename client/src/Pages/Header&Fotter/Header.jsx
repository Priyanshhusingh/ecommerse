import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import { LogoutUrl, Searchproduct } from "../../UrlApi";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [showUserCard, setShowUserCard] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  const handleUserCardToggle = () => {
    setShowUserCard(!showUserCard);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const delayedSearch = useRef(
    debounce((query) => {
      try {
        fetch(`${Searchproduct}/search?q=${query}`).then((resp) =>
          resp.json().then((data) => setSearchResults(data))
        );
      } catch (error) {
        console.log(error);
      }
    }, 500)
  ).current;

  useEffect(() => {
    delayedSearch(searchQuery);
  }, [searchQuery, delayedSearch]);
  const handleLogout = async () => {
    await fetch(LogoutUrl, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setShowUserCard(false);
  };
  console.log(searchResults);
  return (
    <>
      <header className="bg-white p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold text-gray-800">
            <Link to={"/"}>Logo</Link>
          </h3>
        </div>
        <div className="flex items-center border justify-between rounded-full overflow-hidden md:w-[25rem] ">
          <input
            className="px-4 py-2 w-full md:w-48 outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={searchInputRef}
            placeholder="Search..."
          />
          <Link
            to={`/search/${searchQuery}`}
            onClick={() => setSearchQuery("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9 text-gray-500 p-2 cursor-pointer hover:bg-gray-200 transition duration-300"
              onClick={() => searchInputRef.current.focus()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Link>
        </div>
        <div className="relative items-center mt-4 md:mt-0 flex gap-3 ">
          <div className="flex justify-center items-center gap-2">
            <Link to={user ? "/wish-list" : "/login"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={"none"}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </Link>
            <Link to={user ? "/cart" : "/login"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
          </div>
          <button
            onClick={handleUserCardToggle}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 focus:outline-none flex gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <div>{user && user.name}</div>
          </button>

          {showUserCard && (
            <div className="absolute top-12 right-0 w-48 bg-white p-4 rounded-md shadow-md border border-gray-300 z-10">
              {user ? (
                <>
                  <p className="text-gray-800 font-semibold mb-2">
                    Welcome, {user.admin ? "admin" : user.name}!
                  </p>
                  <Link
                    to={user.admin ? "/admin" : "/profile"}
                    className="block py-2 text-blue-500 hover:underline"
                  >
                    View {user.admin ? "Admin" : "Profile"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full py-2 bg-gray-500 text-white rounded-2xl hover:bg-red-500 transition duration-300 mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-blue-500 hover:underline border shadow-gray-500 rounded-2xl text-center hover:bg-gray-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 text-blue-500 hover:underline border shadow-gray-500 rounded-2xl text-center hover:bg-gray-400"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      {searchResults.length > 0 && searchQuery !== "" && (
        <div
          className="shadow-lg rounded-md bg-gray-200 w-96 m-auto mb-4"
          onClick={() => setSearchQuery("")}
        >
          <div className="flex flex-col gap-2 justify-center">
            {searchResults?.map((result) => (
              <Link
                to={`/product/${result._id}`}
                key={result._id}
                className="search-result-link border border-t-gray-400"
              >
                <div className="flex justify-between items-center">
                  <div className="w-14 rounded-md">
                    <img
                      src={`http://localhost:8080/uploads/${result.imageUrl[0]}`}
                      className="rounded-sm object-fill"
                      alt={result.title}
                    />
                  </div>
                  <div>{result.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
