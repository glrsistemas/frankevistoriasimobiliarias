import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Componentes/login";
import Usuario from "./Componentes/Usuario/Usuario";
import Teste from "./Componentes/teste"
import Imobiliaria from "./Componentes/Imobiliaria/Imobiliaria";
import Atendimento from "./Componentes/Atendimento/Atendimento";
import EditarUsuario from "./Componentes/Usuario/EditarUsuario";
import Home from "./Componentes/Home/Home";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teste" element={<Teste />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/imobiliaria" element={<Imobiliaria />} />
        <Route path="/atendimento" element={<Atendimento />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editarusuario" element={<EditarUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}
