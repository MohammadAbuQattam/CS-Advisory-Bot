import React, { useContext, useState } from "react";
import "../signup/signupform.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCSRFToken } from '../../csrfToken';

const LoginPage = () => {
  const [loginUsername, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/chat/login', JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }));

      if (response.data.status === 'success') {
        const user = response.data.user;
        console.log(user)
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setErrorMessage(error.message);
    } finally {
      setCSRFToken();
    }
  };

  return (
    <div className="signupFormContainer">
      <img
        src="../CsAdvisoryBot-icon.png"
        alt="Cs Advisory Bot Logo"
        width="200"
        height="200"
      />
      <h1>Welcome Back</h1>
      <form onSubmit={handleLogin}>
        <input
          type="loginUsername"
          name="loginUsername"
          id="loginUsername"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />
        <div id="signupPassword">
          <input
            type={showLoginPassword ? "text" : "password"}
            name="loginPassword"
            id="loginPassword"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            autoComplete="password"
          />
          {/* eye icon */}
          <i onClick={() => setShowLoginPassword(!showLoginPassword)}>
            {!showLoginPassword ? (
              <svg
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  stroke="#202123"
                  strokeWidth={0.792}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7Z" />
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </g>
                <title>Show Password</title>
              </svg>
            ) : (
              <svg
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000"
              >
                <path
                  d="M20 14.834C21.308 13.332 22 12 22 12s-3.636-7-10-7a8.595 8.595 0 0 0-2 .236M12 9a2.995 2.995 0 0 1 3 3M3 3l18 18m-9-6a2.997 2.997 0 0 1-2.959-2.5M4.147 9c-.308.345-.585.682-.828 1C2.453 11.128 2 12 2 12s3.636 7 10 7c.341 0 .675-.02 1-.058"
                  stroke="#202123"
                  strokeWidth={0.768}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <title>Hide Password</title>
              </svg>
            )}
          </i>
        </div>
        <button type="submit">Continue</button>
        {errorMessage.trim() !== " " && <span>{errorMessage}</span>}
      </form>
    </div>
  );
};

export default LoginPage;
