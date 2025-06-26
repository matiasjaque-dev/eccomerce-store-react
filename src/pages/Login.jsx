import React, { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging in...");

    try {
      const resp = await login(email, password);
      if (!resp) {
        toast.error("Invalid credentials");
        return; // <- Evita redirigir al home
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4"> Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
