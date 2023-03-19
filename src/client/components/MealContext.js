import React, { createContext, useState, useEffect } from "react";

export const MealContext = createContext();

const mealAPI = process.env.REACT_APP_MEALS_URL;

export default function MealProvider({ children }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(mealAPI);
      const response = await data.json();
      setMeals(response);
    }

    fetchData();
  }, []);

  return (
    <>
      <MealContext.Provider value={{ meals }}>{children}</MealContext.Provider>
    </>
  );
}
