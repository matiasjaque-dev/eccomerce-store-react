import toast from "react-hot-toast";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const quantityToAdd = product.quantity || 1;
    const existing = get().cart.find((item) => item.id === product.id);
    const totalRequested = (existing?.quantity || 0) + quantityToAdd;

    if (totalRequested > product.stock) {
      toast.error(`Cannot add more than available stock (${product.stock})`);
      return false; // ❌ Indica fallo
    }

    if (existing) {
      set({
        cart: get().cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        ),
      });
    } else {
      set({ cart: [...get().cart, { ...product, quantity: quantityToAdd }] });
    }
    return true; // ✅ Indica éxito
  },

  removeFromCart: (id, quantityToRemove = 1) => {
    set({
      cart: get().cart.flatMap((item) => {
        if (item.id !== id) return [item];
        const newQuantity = item.quantity - quantityToRemove;
        if (newQuantity > 0) {
          return [{ ...item, quantity: newQuantity }];
        }
        return []; // elimina el producto si llega a 0
      }),
    });
  },

  clearCart: () => set({ cart: [] }),

  getTotal: () =>
    get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
