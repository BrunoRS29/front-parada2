import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Router> {/* Envolva toda a aplicação no Router */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Página inicial de login */}
          <Route path="/register" element={<Register />} /> {/* Página de registro */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
