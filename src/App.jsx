import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Cart from "./components/Cart";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "cart", element: <Cart /> },

        {
          path: "admin",
          element: <ProtectedRoute allowedRoles={["admin"]} />,
          children: [
            { index: true, element: <Admin /> },
            { path: "dashboard", element: <AdminDashboard /> },
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
