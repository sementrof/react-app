import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login-page.css";

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Хук для навигации

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://0.0.0.0:8000/api/v1/admin/auth", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ login, password }),
  //     });

  //     if (response.ok) {
  //       setError(null);
  //       navigate("/admin"); // Перенаправление в админ-панель
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.message || "Ошибка авторизации");
  //     }
  //   } catch (err) {
  //     setError("Ошибка сети. Попробуйте позже.");
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://0.0.0.0:8000/api/v1/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token); // Сохраняем токен в localStorage
        setError(null);
        navigate("/admin"); // Перенаправление в админ-панель
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Ошибка авторизации");
      }
    } catch (err) {
      setError("Ошибка сети. Попробуйте позже.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Вход в админ-панель</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="login">Логин:</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
