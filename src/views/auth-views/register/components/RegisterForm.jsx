/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setPassword,
  registerUser,
} from "../../../../features/register/authRegisterSlice";
import "../../../../styles/RegisterForm.css";

export default function RegisterForm() {
  const dispatch = useDispatch();

  // eslint-disable-next-line object-curly-newline
  const { name, email, password, errorMessage, successMessage } = useSelector(
    (state) => state.register
  );

  const handleRegister = async (event) => {
    event.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <React.StrictMode>
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">REGISTER</h2>
        <div className="input-group">
          <label htmlFor="name" className="input-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            className="input-field"
          />
        </div>
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
            minLength="6"
          />
        </div>
        <button className="register-button" type="submit">
          Register
        </button>
        <p className="login-link">
          Have an account?
          <Link to="/login" className="link-text">
            Login
          </Link>
          here.
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </React.StrictMode>
  );
}
