import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import WishListProdutPage from "./wishListProdutPage";
import { Link } from "react-router-dom";
function WishListPage() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div>
        {user?.wishist?.length > 0 ? (
          <h1>Your WishList Item</h1>
        ) : (
          <h1>No item </h1>
        )}
      </div>
      <div className="mt-10">
        {user?.wishist?.map((product) => (
          <Link to={`/product/${product}`} key={product}>
            <WishListProdutPage product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WishListPage;
