import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

const QuantityConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  maxQuantity,
  itemName,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) setQuantity(1);
  }, [isOpen]);

  const handleConfirm = () => {
    if (quantity >= 1 && quantity <= maxQuantity) {
      onConfirm(quantity);
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Modal content */}
        <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl transform transition-all">
          <h2 className="text-lg font-bold mb-2">Remove Items</h2>
          <p className="mb-4 text-sm text-gray-700">
            You have{" "}
            <span className="font-semibold">
              {maxQuantity} {itemName}
            </span>{" "}
            in your cart.
            <br />
            How many do you want to remove?
          </p>
          <input
            type="number"
            value={quantity}
            min={1}
            max={maxQuantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
                setQuantity(value);
              }
            }}
            className="w-full p-2 border rounded mb-4 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded text-white font-semibold bg-red-500 hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              Remove
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QuantityConfirmModal;
