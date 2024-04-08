import React from "react";
import { Routes, Route } from "react-router-dom";
import { Products } from "./pages/product";
import { Cart} from "./pages/cart";
import { Navbar } from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/"  element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>
    </div>
  );
}

export default App;
