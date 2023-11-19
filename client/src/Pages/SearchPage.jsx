import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Searchproduct } from "../UrlApi";

function SearchPage() {
  const { searchQuery } = useParams();
  const [searchallResults, setSearchallResults] = useState([]);

  useEffect(() => {
    try {
      fetch(`${Searchproduct}/search?q=${searchQuery}`).then((resp) =>
        resp.json().then((data) => setSearchallResults(data))
      );
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery]);
  console.log(searchQuery);
  return (
    <div>
      {searchallResults.length > 0 && searchQuery !== "" && (
        <div className="shadow-lg rounded-md w-full m-auto">
          <div className="gap-8 flex flex-col">
            {searchallResults?.map((result) => (
              <Link
                to={`/product/${result._id}`}
                key={result._id}
                className="search-result-link shadow-md rounded-2xl"
              >
                <div className="flex justify-between items-center">
                  <div className="w-28 rounded-md">
                    <img
                      src={`http://localhost:8080/uploads/${result.imageUrl[0]}`}
                      alt={result.title}
                    />
                  </div>
                  <div className="text-2xl">{result.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
