import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";

const ProductModal = ({ isOpen, product, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const loadingToast = toast.loading("Adding to cart...");
    try {
      await onAddToCart({ ...product, quantity });
      toast.success(`${product.name} added to cart`);
      onClose();
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  if (!product) return null;
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
            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold mb-2">
                {product.name}
              </Dialog.Title>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-gray-600 mb-4">Stock: {product.stock}</p>

              <label className="block mb-2 font-medium">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                max={product.stock}
                className="w-full border rounded-md p-2 mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add to cart
                </button>
              </div>
            </Dialog.Panel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductModal;
