import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import AddProduct from "./AddProduct";
import ProductDetail from "./ProductDetail";

function App() {
  const isLoggedIn = !!localStorage.getItem("pi-demo-user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/add"
          element={isLoggedIn ? <AddProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/detail/:id"
          element={isLoggedIn ? <ProductDetail /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
    
