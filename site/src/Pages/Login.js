import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const { apiUrl, onLogin } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const updateFields = (field, e) => {
    if (field === "username") {
      setUsername(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    }
  };

  const loginBtn = () => {
    if (username !== "" && password !== "") {
      setLoading(true);
      setTimeout(() => {
        axios
          .post(apiUrl + "login/", {
            username: username,
            password: password,
          })
          .then((res) => {
            if (res.data === "OK") {
              setLoading(false);
              onLogin({ username, password });
              setUsername("");
              setPassword("");
            } else {
              setLoading(false);
              alert("Username or Password is incorrect!");
            }
          });
      }, 1500);
    } else {
      alert("Please fill out all fields!");
    }
  };

  return (
    <div className="login-bg">
      {loading ? (
        <div className="loading-screen">
          <div className="loader"></div>
        </div>
      ) : null}

      <div className="form">
        <h1>Login</h1>
        <h5>Please enter username and password</h5>

        <input
          className="field"
          type="email"
          onChange={(e) => updateFields("username", e)}
          value={username}
          placeholder="Username"
        />
        <input
          className="field"
          type="password"
          onChange={(e) => updateFields("password", e)}
          value={password}
          placeholder="Password"
        />

        <h5 style={{ marginTop: "20px" }}>
          <a style={{ color: "#62696b" }} href="https://google.com">
            Forget Password?
          </a>
        </h5>

        <input className="btn" type="button" value="Login" onClick={loginBtn} />

        <h5 style={{ marginTop: "20px" }}>
          <a style={{ color: "#62696b" }} href="/register">
            Don't have an account?
          </a>
        </h5>
      </div>
    </div>
  );
};

export default Login;
