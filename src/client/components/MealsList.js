import React, { useEffect, useState } from "react";
const mealAPI = process.env.REACT_APP_MEALS_URL;

export default function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(mealAPI);
      const res = await data.json();
      setMeals(res);
    }
    console.log(mealAPI);
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {meals.map((item) => {
          return (
            <div key={item.id} style={{border: "1px solid", textAlign: "center"}}>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.price} kr.</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
