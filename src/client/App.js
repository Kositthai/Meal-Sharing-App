import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealList from "./components/MealsList";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <p>test</p>
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/meals">
        <MealList />
      </Route>
    </Router>
  );
}

export default App;
