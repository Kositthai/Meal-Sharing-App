import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import MealProvider from "./components/MealContext";

ReactDOM.render(
  <Router>
    <MealProvider>
      <App />
    </MealProvider>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
