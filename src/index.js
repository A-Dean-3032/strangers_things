import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

// const Base_URL = "https://strangers-things.herokuapp.com/api";
// const Cohort_Name = "2209-ftb-et-web-pt";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              setPassword={setPassword}
              setUsername={setUsername}
              password={password}
              username={username}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={
            <Login
              setPassword={setPassword}
              setUsername={setUsername}
              password={password}
              username={username}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          exact
          path="/register"
          element={
            <Register
              setPassword={setPassword}
              setUsername={setUsername}
              password={password}
              username={username}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          exact
          path="/posts"
          element={<Posts posts={posts} setPosts={setPosts} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Posts /> */}
    <App />
  </React.StrictMode>
);
