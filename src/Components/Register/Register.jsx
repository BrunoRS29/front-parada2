import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaLockOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import RegisterService from "../../Api/RegisterService";


const Register = () => {
  const [nome, setnome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const userData = await RegisterService(nome, email, password);
      console.log("Usuário registrado:", userData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Erro ao realizar registro.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <img src="src\assets\imagem_2024-11-28_165655013-removebg-preview.png"/>
        <h1>Crie sua conta</h1>

        {error && <p className="error-message">{error}</p>}

        <div className="input-field">
          <input
            type="text"
            placeholder="Nome"
            required
            value={nome}
            onChange={(e) => setnome(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Confirmar Senha"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaLockOpen className="icon" />
        </div>

        <button type="submit">Registrar</button>

        <div className="signin-link">
          <p>
            Já tem uma conta?{" "}
            <Link to="/">
              Fazer login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
