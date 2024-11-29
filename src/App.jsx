import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Cliente from "./Components/Cliente/Cliente";
import Ordem from "./Components/Ordem Serviço/Ordem";


function App() {
  return (
    <Router> {/* Envolva toda a aplicação no Router */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/ordem" element={<Ordem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
