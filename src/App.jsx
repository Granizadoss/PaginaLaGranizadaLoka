import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import AIChat from "./components/AIChat/AIChat";
import AdminRoute from "./components/AdminRoute/AdminRoute";

import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Confirmation from "./pages/Confirmation/Confirmation";
import Pedidos from "./pages/Pedidos/Pedidos";
import Admin from "./pages/Admin/Admin";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import Product from "./pages/Product/Product";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>

      {/* =====================================
          NAVBAR
      ===================================== */}

      <Navbar />


      {/* =====================================
          RUTAS
      ===================================== */}

      <Routes>

        {/* =================================
            PÁGINAS PRINCIPALES
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/menu"
          element={<Menu />}
        />

        <Route
          path="/nosotros"
          element={<About />}
        />

        <Route
          path="/contacto"
          element={<Contact />}
        />


        {/* =================================
            LOGIN
        ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />
{/* =================================
    DETALLE DEL PRODUCTO
================================= */}

<Route
  path="/producto/:id"
  element={<Product />}
/>

        {/* =================================
            CARRITO Y COMPRA
        ================================= */}

        <Route
          path="/carrito"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/confirmacion"
          element={<Confirmation />}
        />


        {/* =================================
            PEDIDOS
        ================================= */}

        <Route
          path="/pedidos"
          element={<Pedidos />}
        />


        {/* =================================
            ADMINISTRADOR
        ================================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />


        {/* =================================
            PRODUCTOS ADMIN
        ================================= */}

        <Route
          path="/admin/productos"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

      </Routes>


      {/* =====================================
          ASISTENTE DE IA
      ===================================== */}

      <AIChat />

    </CartProvider>
  );
}

export default App;