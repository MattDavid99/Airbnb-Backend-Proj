import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupFormPage({ onSuccess }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const isFormInvalid = () => {
    return (
      !email ||
      username.length < 4 ||
      firstName === "" ||
      lastName === "" ||
      password.length < 6 ||
      confirmPassword !== password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const success = await dispatch(
        sessionActions.signup({ email, username, firstName, lastName, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          let errorMessages = [];

          if (Array.isArray(data.errors)) {
            errorMessages = data.errors;
          } else {
            for (const key in data.errors) {
              if (data.errors.hasOwnProperty(key)) {
                const errorValue = data.errors[key];
                if (Array.isArray(errorValue)) {
                  errorValue.forEach((errorMsg) => {
                    errorMessages.push(`${key}: ${errorMsg}`);
                  });
                } else {
                  errorMessages.push(`${key}: ${errorValue}`);
                }
              }
            }
          }
          setErrors(errorMessages);
        }
      });

      if (success) {
        onSuccess();
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <ul className="signup-ul">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="signup-label">
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="signup-input"
        />
      </label>
      <button
        type="submit"
        className="signup-form__submit-btn"
        disabled={isFormInvalid()}
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignupFormPage;
