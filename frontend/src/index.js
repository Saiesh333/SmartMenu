import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./customer/context/CartContext";

// IMPORTANT: do NOT wrap App in BrowserRouter here
// Router must stay inside App.js only

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
