import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { BrowserRouter  } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
