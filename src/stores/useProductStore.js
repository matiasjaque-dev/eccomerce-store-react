import { create } from "zustand";
import {
  createProduct,
  deleteProductById,
  fetchProducts,
  updateProductById,
} from "../services/productsService";

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,

  fetchAllProducts: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchProducts();
      set({ products: data });
    } catch (error) {
      console.info(error);
    } finally {
      set({ isLoading: false });
    }
  },

  setProducts: (products) => set({ products }),

  addProduct: async (product) => {
    try {
      const newProduct = await createProduct(product);
      set((state) => ({
        products: [...state.products, newProduct],
      }));
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  },

  updateProduct: async (id, updatedData) => {
    try {
      await updateProductById(id, updatedData);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...updatedData } : p
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  },

  deleteProduct: async (id) => {
    try {
      await deleteProductById(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  },
}));
