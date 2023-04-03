import React, { useContext } from "react";
import Meal from "./Meal";
import MealProvider from "./MealContext";

export default function MealList() {
  return (
    <MealProvider>
      <div>
        <Meal />
      </div>
    </MealProvider>
  );
}
