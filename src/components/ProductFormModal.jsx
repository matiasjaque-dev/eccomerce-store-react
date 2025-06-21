import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const ProductFormModal = ({ isOpen, onClose, product, isEditing }) => {
  const { addProduct, updateProduct } = useProductStore();

  const [form, setForm] = useState({
    name: "",
    category: "clothes",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (isEditing) {
      updateProduct(form.id, form);
      toast.success("Product updated successfully");
    } else {
      addProduct(form);
      toast.success("Product created successfully");
    }
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <DialogPanel className="w-full max-w-md bg-white p-6 rounded shadow-xl">
              <h2 className="text-lg font-semibold mb-4">
                {isEditing ? "Edit Product" : "Add Product"}
              </h2>

              <div className="space-y-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  className="w-full border p-2 rounded"
                />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="clothes">Clothes</option>
                  <option value="footwear">Footwear</option>
                  <option value="accessories">Accessories</option>
                </select>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  inputMode="decimal"
                  className="w-full border p-2 rounded"
                />

                <input
                  type="text"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  inputMode="numeric"
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductFormModal;
