import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Ecommerce Store. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
