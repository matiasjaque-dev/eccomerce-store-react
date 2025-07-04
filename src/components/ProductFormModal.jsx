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
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      // Permitir solo números y punto
      if (/^\d*\.?\d*$/.test(value)) {
        setForm((prev) => ({
          ...prev,
          [name]: value, // guardamos como string para mantener controlado el input
        }));
      }
    } else if (name === "stock") {
      // Permitir solo números enteros
      if (/^\d*$/.test(value)) {
        setForm((prev) => ({
          ...prev,
          [name]: value === "" ? "" : Number(value),
        }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const finalForm = {
      ...form,
      price: Number(form.price),
      category:
        form.category === "custom" && form.customCategory
          ? form.customCategory.trim()
          : form.category,
    };

    // Validations
    if (!finalForm.name.trim()) {
      toast.error("Product name cannot be empty.");
      return;
    }
    if (
      !finalForm.category ||
      (form.category === "custom" && !form.customCategory.trim())
    ) {
      toast.error("Please provide a valid category.");
      return;
    }
    if (!finalForm.price || finalForm.price <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }
    if (finalForm.stock < 1) {
      toast.error("Stock must be greater than 0.");
      return;
    }

    if (isEditing) {
      updateProduct(finalForm.id, finalForm);
      toast.success("Product updated successfully");
    } else {
      addProduct(finalForm);
      toast.success("Product created successfully");
    }
    onClose();
    setForm({ name: "", category: "clothes", price: "", stock: "" });
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
              <div className="space-y-4">
                <div className="relative">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    className="peer w-full border p-2 rounded placeholder-transparent focus:outline-none focus:border-blue-500"
                    placeholder="Product Name"
                  />

                  <label
                    htmlFor="name"
                    className="absolute left-2 top-2 text-gray-500 transition-all
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base
      peer-placeholder-shown:text-gray-400
      peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
      peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-xs bg-white px-1"
                  >
                    Product Name
                  </label>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="category" className="text-sm text-gray-600">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="clothes">Clothes</option>
                    <option value="footwear">Footwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="custom">Other (custom)</option>
                  </select>
                </div>

                {form.category === "custom" && (
                  <div className="relative">
                    <input
                      id="customCategory"
                      name="customCategory"
                      value={form.customCategory || ""}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full border p-2 rounded placeholder-transparent focus:outline-none focus:border-blue-500"
                    />
                    <label
                      htmlFor="customCategory"
                      className="absolute left-2 top-2 text-gray-500 transition-all
                    peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                    peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-xs bg-white px-1"
                    >
                      Custom Category
                    </label>
                  </div>
                )}

                <div className="relative">
                  <input
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder=" "
                    inputMode="decimal"
                    className="peer w-full border p-2 rounded placeholder-transparent focus:outline-none focus:border-blue-500"
                  />
                  <label
                    htmlFor="price"
                    className="absolute left-2 top-2 text-gray-500 transition-all
                    peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                    peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-xs bg-white px-1"
                  >
                    Price
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="stock"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder=" "
                    inputMode="numeric"
                    className="peer w-full border p-2 rounded placeholder-transparent focus:outline-none focus:border-blue-500"
                  />
                  <label
                    htmlFor="stock"
                    className="absolute left-2 top-2 text-gray-500 transition-all
                    peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                    peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-xs bg-white px-1"
                  >
                    Stock
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 border rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
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
