import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const { apiUrl, onLogin } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateFields = (field, e) => {
    if (field === "username") {
      setUsername(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    }
  };

  const loginBtn = async () => {
    if (username !== "" && password !== "") {
      const res = await axios.post(apiUrl + "login/", {
        username: username,
        password: password,
      });
      if (res.data === "OK") {
        onLogin({username, password});
        setUsername("");
        setPassword("");
      } else {
        alert("Username or Password is incorrect!");
      }
    }
    else {
        alert("Please fill out all fields!");
    }
  };

  return (
    <div className="login-bg">
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
      </div>
    </div>
  );
};

export default Login;
