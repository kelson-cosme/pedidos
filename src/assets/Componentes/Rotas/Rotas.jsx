import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FazerP from "../Pages/FazerPedidos.jsx"

function Rotas() {

    return (
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<FazerP/>} />
              </Routes>
          </BrowserRouter>
    )
  }
  
  export default Rotas