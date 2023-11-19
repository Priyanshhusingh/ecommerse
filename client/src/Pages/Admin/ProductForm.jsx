import React, { useEffect, useState } from "react";
import {
  uploadByLinkUrl,
  uploadUrl,
  productsUrl,
  ProductUrl,
} from "../../UrlApi";
import { Navigate, useParams } from "react-router-dom";

function ProductForm() {
  const { id } = useParams();
  const [value, setValue] = useState({
    title: "",
    description: "",
    price: "",
    productImage: [],
    productQuantity: "",
  });
  const [imageurl, setimageUrl] = useState("");
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`${ProductUrl}/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => setValue({ ...data, productImage: data.imageUrl }));
  }, [id]);
  console.log(value);
  function handleChange(e) {
    const { name, value } = e.target;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function isValidURL(str) {
    return str.startsWith("http://") || str.startsWith("https://");
  }

  function uploadPhotoByLink(e) {
    e.preventDefault();
    if (!isValidURL(imageurl)) {
      console.error("Invalid Url");
      return;
    }
    try {
      fetch(uploadByLinkUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: imageurl }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setValue((prevValue) => ({
            ...prevValue,
            productImage: [...prevValue.productImage, data],
          }));
        });
      setimageUrl("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("productImage", files[i]);
    }

    fetch(uploadUrl, {
      method: "POST",
      credentials: "include",
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((filename) => {
        setValue({
          ...value,
          productImage: [...value.productImage, ...filename],
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }

  function removePhoto(filename) {
    setValue((prevValue) => ({
      ...prevValue,
      productImage: prevValue.productImage.filter(
        (photo) => photo !== filename
      ),
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        const response = await fetch(`${ProductUrl}/${id}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });
        if (response.ok) {
          alert("Form Submit successful");
          setRedirect(true);
        } else {
          alert("form submission failed");
        }
      } catch (error) {
        console.log(`FormSubmit Error ${error}`);
      }
    } else {
      try {
        const response = await fetch(productsUrl, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });
        if (response.ok) {
          alert("Form Submit successful");
          setRedirect(true)
        } else {
          alert("form submission failed");
        }
      } catch (error) {
        console.log(`FormSubmit Error ${error}`);
      }
    }
  };
  if (redirect) {
    return <Navigate to={"/admin/product"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Add Product Info
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title:
              <p className="text-gray-400 text-xs">
                Enter title of the product
              </p>
            </label>
            <input
              type="text"
              name="title"
              value={value.title}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description:
              <p className="text-gray-400 text-xs">
                Enter Description of the product
              </p>
            </label>
            <input
              type="text"
              name="description"
              value={value.description}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price:
              <p className="text-gray-400 text-xs">
                Enter Price of the product
              </p>
            </label>
            <input
              type="Number"
              name="price"
              value={value.price}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="imageurl"
              className="block text-sm font-medium text-gray-600"
            >
              Image (Link):
              <p className="text-gray-400 text-xs">
                Enter image URL of the product
              </p>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="imageurl"
                value={imageurl}
                placeholder="Add using a Link ..."
                onChange={(e) => setimageUrl(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              />
              <button
                onClick={uploadPhotoByLink}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl"
              >
                Upload
              </button>
            </div>
          </div>

          <div className="mb-4 flex gap-4 ">
            <label
              htmlFor="fileUpload"
              className="flex items-center gap-1 cursor-pointer border bg-transparent rounded-2xl p-8 text-gray-600"
            >
              <input
                type="file"
                id="fileUpload"
                multiple
                className="hidden"
                onChangeCapture={uploadPhoto}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload
            </label>
            {value.productImage.length > 0 &&
              value.productImage.map((link, index) => (
                <div key={index} className="relative flex items-center">
                  <img
                    src={`http://localhost:8080/uploads/${link}`}
                    alt=""
                    className="w-32 h-32 object-cfill rounded-2xl"
                  />
                  <button
                    onClick={() => removePhoto(link)}
                    className="absolute bottom-0 right-0 text-white hover:text-black px-2 py-1 rounded-md"
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
                  </button>
                </div>
              ))}
          </div>

          <div className="mb-4">
            <label
              htmlFor="productQuantity"
              className="block text-sm font-medium text-gray-600"
            >
              Quantity:
              <p className="text-gray-400 text-xs">
                Enter Quantity of the product
              </p>
            </label>
            <input
              type="Number"
              name="productQuantity"
              value={value.productQuantity}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-full">
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
