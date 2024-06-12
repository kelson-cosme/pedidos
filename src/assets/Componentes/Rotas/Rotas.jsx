import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FazerP from "../Pages/FazerPedidos.jsx"
import VerP from "../Pages/verPedidos.jsx"

function Rotas() {

    return (
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<FazerP/>} />
                <Route path="/pedidos" element={<VerP/>} />

              </Routes>
          </BrowserRouter>
    )
  }
  
  export default Rotas