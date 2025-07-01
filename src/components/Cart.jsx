import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";
import QuantityConfirmModal from "./common/QuantityConfirmModal";

const Cart = () => {
  const { cart, removeFromCart, getTotal, clearCart } = useCartStore();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRemove = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
      toast.success(`${item.name} removed from cart`);
    } else {
      setSelectedItem(item);
    }
  };

  if (cart.length === 0)
    return <p className="text-center py-4">Your cart is empty.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <div>
            <p>
              {item.name} x {item.quantity}
            </p>
            <p className="text-sm text-gray-500">${item.price} each</p>
          </div>
          <button
            onClick={() => handleRemove(item)}
            className="text-sm text-red-600 hover:text-red-700 underline transition"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 font-semibold">Total: ${getTotal().toFixed(2)}</div>
      <button
        onClick={clearCart}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Clear Cart
      </button>

      {selectedItem && (
        <QuantityConfirmModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          maxQuantity={selectedItem.quantity}
          itemName={selectedItem.name}
          onConfirm={(quantityToRemove) => {
            removeFromCart(selectedItem.id, quantityToRemove);
            toast.success(
              `${quantityToRemove} ${selectedItem.name} removed from cart`
            );
          }}
        />
      )}
    </div>
  );
};

export default Cart;
