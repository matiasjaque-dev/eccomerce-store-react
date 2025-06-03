import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

const Home = () => {
  const { products, fetchAllProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product) => (
            <div key={product.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold ">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
              <p className="text-sm text-gray-500">In Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
