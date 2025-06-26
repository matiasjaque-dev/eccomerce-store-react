import { create } from "zustand";
import { login, logout } from "../services/authService";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const user = await login(email, password);

          if (!user) throw new Error("Invalid credentials");

          set({ user, role: user.role });
          return user;
        } catch (error) {
          console.error("Error al iniciar sesión:", error.message);
        } finally {
          set({ isLoading: false });
        }
      },
      logout: async () => {
        await logout(), set({ user: null });
      },
    }),
    {
      name: "auth-storage", // clave en localStorage
    }
  )
);

export default useAuthStore;
