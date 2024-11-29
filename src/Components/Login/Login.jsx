  import { useState } from "react";
  import { FaUser, FaLock } from "react-icons/fa";
  import "./Login.css";
  import { Link } from "react-router-dom"; 
  import { useNavigate } from "react-router-dom";
  import LoginService from "../../Api/LoginService"

  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] =useState("")
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      setError("");

      try {
        const userData = await LoginService(email, password);
        console.log("Login bem-sucedido", userData);
        navigate("/home");
      } catch (err) {
        setError(err.message || "Erro ao realizar login.");
      }
    };

    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <img src="src\assets\imagem_2024-11-28_165655013-removebg-preview.png"/>
          <h1>Acesse o sistema</h1>

          {error && <p className="error-message">{error} </p>}

          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
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

          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
          </div>
          <button type="submit">Login</button>
          <div className="signup-link">
          <p>
              Não tem uma conta?{" "}
              <Link to="/register" className="register-link">
                Registrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  };

  export default Login;