import React, { useState } from "react";
import * as sessionActions from "../../store/auth";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ email, password }))
  };

  return (
    <div className="login-container">
      <div className="login-form-header">
        Log In
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <input
            className="login-form-input"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <input
            className="login-form-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button className="login-form-submit" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;