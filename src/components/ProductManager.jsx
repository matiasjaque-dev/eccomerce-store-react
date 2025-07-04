import React, { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductFormModal from "./ProductFormModal";
import toast from "react-hot-toast";
import ConfirmDialog from "./common/ConfirmDialog";

const ProductManager = () => {
  const { products, fetchAllProducts, deleteProduct, isLoading } =
    useProductStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteProduct(productToDelete);
    toast.success("Product deleted successfully");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </div>
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          Loading products...
        </div>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border">${product.price}</td>
                <td className="p-2 border">{product.stock}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        isEditing={isEditing}
      />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default ProductManager;
