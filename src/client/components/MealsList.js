import React from "react";
import Footer from "./Footer";
import AllMeals from "./AllMeals";
import NavBar from "./Navbar";

export default function MealList() {
  return (
    <div>
      <NavBar />
      <AllMeals />
      <Footer />
    </div>
  );
}
