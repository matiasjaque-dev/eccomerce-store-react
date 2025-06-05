import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          MyStore
        </Link>
        <div className="space-x-4 hidden md:block">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
