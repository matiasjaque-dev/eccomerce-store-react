// components/common/ConfirmDialog.jsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition
            show={isOpen}
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <div className="w-full max-w-sm rounded bg-white p-6 shadow-xl">
              <h2 className="text-lg font-semibold mb-2">
                {title || "Confirm Action"}
              </h2>
              <p className="mb-4 text-sm text-gray-600">{message}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 border rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmDialog;
