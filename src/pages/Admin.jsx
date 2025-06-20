import React from "react";

const Admin = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Solo accesible para usuarios con rol "admin".</p>
    </div>
  );
};

export default Admin;
