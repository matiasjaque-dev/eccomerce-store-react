import { useCartStore } from "../stores/useCartStore";

const Cart = () => {
  const { cart, removeFromCart, getTotal, clearCart } = useCartStore();

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
            onClick={() => removeFromCart(item.id)}
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 font-semibold">Total: ${getTotal().toFixed(2)}</div>
      <button
        onClick={clearCart}
        className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
