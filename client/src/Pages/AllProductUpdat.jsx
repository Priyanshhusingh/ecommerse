import React, { useState, useEffect } from "react";
import { AllproductsUrl, ProductPerPage, ProductUrl } from "../UrlApi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductAdmin() {
  const [showAllproduct, setShowAllProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const handleProductDelete = async (id) => {
    try {
      const response = await fetch(`${ProductUrl}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Product Deleted Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
        setRefresh(!refresh);
      } else {
        toast.error("Failed to delete product", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    fetch(`${ProductPerPage}/?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setShowAllProduct(data.products);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [currentPage, refresh]);

  return (
    <div>
      <div className="mt-6 text-center underline">
        <Link
          to={"/admin/add-product"}
          className="text-lg font-semibold mt-4 p-5 items-center shadow-md rounded-xl shadow-gray-500"
        >
          Add New Product{" "}
        </Link>
      </div>
      <div className="mb-4 text-2xl font-bold text-center underline mt-20">
        All Product
      </div>
      {showAllproduct?.map((product) => (
        <div
          key={product._id}
          className="border p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={`http://localhost:8080/uploads/${product.imageUrl[0]}`}
                className="w-28 mr-4"
                alt={product.title}
              />
              <div>
                <h2 className="text-xl font-bold">{product.title}</h2>
                <h3 className="font-semibold">Price: ${product.price}</h3>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                to={`/admin/product/update/${product._id}`}
                className="mr-4 cursor-pointer"
              >
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
              <div
                className="cursor-pointer right-0 p-2 hover:text-red-600 transition duration-300 ease-in-out"
                onClick={(e) => handleProductDelete(product._id, e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <div className="text-lg">
          Page {currentPage} of {totalPages}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductAdmin;
