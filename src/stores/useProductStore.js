import { create } from "zustand";
import { fetchProducts } from "../services/productsService";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  fetchAllProducts: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchProducts();
      set({ products: data });
    } catch (error) {
      console.info(error);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
}));
