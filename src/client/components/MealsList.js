import React, { useEffect, useState } from "react";
const mealAPI = process.env.REACT_APP_MEALS_URL;

export default function MealList() {
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
    <div>
      {meals.map((meal) => {
        return (
          <div
            key={meal.id}
            style={{ border: "1px solid", textAlign: "center" }}
          >
            <p>{meal.title}</p>
            <p>{meal.description}</p>
            <p>{meal.price} kr.</p>
          </div>
        );
      })}
    </div>
  );
}
