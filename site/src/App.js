import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

// Pages
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const apiUrl = "http://192.168.1.193:5000/";
  const pages = ["", "login", "register"];
  const page = window.location.href.split("/")[3];
  var isFound = false;

  pages.forEach((thePage) => {
    if (page === thePage) {
      isFound = true;
    }
  });

  const handleUser = (user) => {
    setCookie("user", user, { path: "/" });
  };

  return (
    <Router>
      <Header page={page} />

      {isFound ? (
        <Routes>
          <Route
            path="/"
            element={
              <CookiesProvider>
                <div>
                  {cookies.user ? (
                    <Home apiUrl={apiUrl} user={cookies.user} />
                  ) : (
                    <Login apiUrl={apiUrl} onLogin={handleUser} />
                  )}
                </div>
              </CookiesProvider>
            }
          />
          <Route path="/register" element={<Signup apiUrl={apiUrl} onSignup={handleUser}/>} />
        </Routes>
      ) : null}

      <Footer />
    </Router>
  );
};

export default App;
