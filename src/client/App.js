import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealList from "./components/MealsList";
import HomePage from "./components/HomePage";
import Review from "./components/Review"; 
import MealDetail from "./components/MealDetail";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/meals">
        <MealList />
      </Route>
      <Route exact path="/meals/:id/review">
        <Review />
      </Route>
      <Route exact path="/meals/:id"> 
          <MealDetail />    
      </Route>
    </Router>
  );
}

export default App;
