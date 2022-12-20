import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Posts from "./Posts";



// const Base_URL = "https://strangers-things.herokuapp.com/api";
// const Cohort_Name = "2209-ftb-et-web-pt";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Posts />
  </React.StrictMode>
);
