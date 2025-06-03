import { create } from "zustand";
import { login, logout } from "../services/authService";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = await login(email, password);
      set({ user });
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    await logout(), set({ user: null });
  },
}));

export default useAuthStore;
