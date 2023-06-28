import React from "react";
import { useAuth } from "./../context/AuthContext";
import Link from "next/link";

const Wishlist = () => {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        user.isSeller ? (
          <div className="flex items-center justify-center mt-10 text-2xl font-bold">
            You are a Landloard. You cannot wishlist houses
          </div>
        ) : (
          <div>Favoruite Houses</div>
        )
      ) : (
        <div className="flex flex-col space-y-2 items-center justify-center mt-10">
          <h1 className="text-2xl font-bold">You are Not Signed In</h1>
          <Link href="/login">
            <a className="px-10 py-3 bg-gray-300 rounded-md">Login</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
