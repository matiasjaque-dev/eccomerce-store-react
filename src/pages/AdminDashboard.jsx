import React from "react";
import ProductManager from "../components/ProductManager";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold m-4">Admin Dashboard</h1>
      <ProductManager />
    </div>
  );
};

export default AdminDashboard;
