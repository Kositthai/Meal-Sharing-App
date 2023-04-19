import React, { useContext } from "react";
import Footer from "./Footer";
import AllMeals from "./AllMeals";
import NavBar from "./Navbar";
import { MealContext } from "./MealContext";

export default function MealList() {
  const { isFound } = useContext(MealContext);

  return (
    <div className="meal-list">
      <NavBar />
      <AllMeals />
      {isFound ? <Footer /> : null}
    </div>
  );
}
