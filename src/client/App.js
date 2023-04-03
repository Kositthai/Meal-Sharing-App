import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealList from "./components/MealsList";
import HomePage from "./components/HomePage";
import Review from "./components/Review"; 
const MealDetail = React.lazy(() => import("./components/MealDetail"));

function App() {
  return (
    <Router>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/meals">
        <MealList />
      </Route>
      <Route exact path="/meals/:id/review">
        <Review />
      </Route>
      <Route exact path="/meals/:id">
        <Suspense fallback={<div>Loading...</div>}>
          <MealDetail />
        </Suspense>
      </Route>
    </Router>
  );
}

export default App;
