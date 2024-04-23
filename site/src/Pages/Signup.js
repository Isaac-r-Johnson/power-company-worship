import React, { useState } from "react";
import axios from "axios";

const Button = ({ name, onClick, selected }) => {
    const handleClick = () => {
      onClick(name);
    };
  
    return (
      <input
        className={`instrument ${selected.includes(name) ? "clicked" : ""}`}
        type="button"
        value={name}
        onClick={handleClick}
      />
    );
  };

const Signup = (props) => {
  const { apiUrl, onSignup } = props;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [infoForm, setInfoForm] = useState(true);
  const [selectedInstruments, setSelectedInstruments] = useState([]);

  const updateFields = (field, e) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "username") {
      setUsername(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    }
  };

  const signupBtn = async () => {
    if (name !== "" && username !== "" && password !== "" && selectedInstruments.length > 0) {
      const res = await axios.post(apiUrl + "signup/", {
        name: name,
        username: username,
        password: password,
        instruments: selectedInstruments
      });
      if (res.data === "OK") {
        onSignup({ username, password });
        setUsername("");
        setPassword("");
      } else {
        alert("Username or Password is incorrect!");
      }
    } else {
        alert("Please fill out all fields!");
        window.location.reload();
    }
  };

  const select = (name) => {
    const updatedSelection = [...selectedInstruments];
    const index = updatedSelection.indexOf(name);
    if (index === -1) {
      updatedSelection.push(name); // Add to selection if not already selected
    } else {
      updatedSelection.splice(index, 1); // Remove from selection if already selected
    }
    setSelectedInstruments(updatedSelection);
  };

  return (
    <div className="signup-bg">
      {infoForm ? (
        <div className="form">
          <h1>Register</h1>
          <h5>Please enter your info</h5>

          <input
            className="field"
            type="text"
            onChange={(e) => updateFields("name", e)}
            value={name}
            placeholder="Name"
          />
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

          <input
            className="btn"
            type="button"
            value="Next"
            onClick={() => setInfoForm(false)}
          />
        </div>
      ) : !infoForm ? (
        <div className="form">
          <h1>Register</h1>
          <h5>Please select your skills</h5>

          <div className="instruments">
            <Button name="Acoustic Guitar" selected={selectedInstruments} onClick={select} />
            <Button name="Electric Guitar" selected={selectedInstruments} onClick={select} />
            <Button name="Vocals" selected={selectedInstruments} onClick={select} />
            <Button name="Drums" selected={selectedInstruments} onClick={select} />
            <Button name="Cajon" selected={selectedInstruments} onClick={select} />
            <Button name="Base" selected={selectedInstruments} onClick={select} />
            <Button name="Keyboard" selected={selectedInstruments} onClick={select} />
            <Button name="Tech" selected={selectedInstruments} onClick={select} />
            <Button name="Other" selected={selectedInstruments} onClick={select} />
          </div>

          <input
            className="btn"
            type="button"
            value="Register"
            onClick={signupBtn}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Signup;