import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./styles/global.css";

import App from "./App";

import { ProductsProvider } from "./context/ProductsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>
);