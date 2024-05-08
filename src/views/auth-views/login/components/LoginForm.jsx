/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  loginUser,
} from "../../../../features/login/authLoginSlice";
import "../../../../styles/LoginForm.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line object-curly-newline
  const { email, password, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password })).then((response) => {
      if (response.type === "auth/loginUser/fulfilled") {
        localStorage.setItem("token", response.payload);
        navigate("/threads");
      }
    });
  };

  return (
    <React.StrictMode>
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">LOGIN</h2>
        <div className="input-group">
          <label htmlFor="email" className="input-label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="input-field"
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        <p className="register-link">
          Don't have an account?
          <Link to="/register" className="link-text">
            Register
          </Link>
          here.
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </React.StrictMode>
  );
}
