import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAvailableStock } from "../helpers/stockUtils";
import { useCartStore } from "../stores/useCartStore";

const ProductModal = ({ isOpen, product, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const { cart } = useCartStore();

  const availableStock = product
    ? getAvailableStock(product.id, product.stock, cart)
    : 0;

  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  const handleAddToCart = async () => {
    const loadingToast = toast.loading("Adding to cart...");
    try {
      const resp = await onAddToCart({ ...product, quantity });
      if (resp) {
        toast.success(`${product.name} added to cart`);
      }
      onClose();
      setQuantity(1);
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
              <p className="text-gray-600 mb-4">Available: {availableStock}</p>

              <label className="block mb-2 font-medium">Quantity</label>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 border rounded text-lg font-bold hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      const numeric = Number(value);
                      if (numeric >= 1 && numeric <= product.stock) {
                        setQuantity(numeric);
                      } else if (value === "") {
                        setQuantity("");
                      }
                    }
                  }}
                  onBlur={() => {
                    if (!quantity || quantity < 1) setQuantity(1);
                  }}
                  className="w-16 text-center border rounded p-2"
                />
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-3 py-1 border rounded text-lg font-bold hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 border rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
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
