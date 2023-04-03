import { MealContext } from "./MealContext";
import React, { useContext } from "react";
import mealCard from "./styles/mealCard.css";
import foodPics from "../../../public/foodPics.jpg";

export default function Meal() {
  
  const { meals } = useContext(MealContext);

  return (
      <div className="meal-container">
        {meals?.map((meal) => {
          return (
            <div key={meal.id} className="meal-card">
              <div>
                <img src={foodPics} alt="foodSamplePic" />
              </div>
              <div>
                <h3>{meal.title}</h3>
                <p>{meal.description}</p>
              </div>
              <div className="meal-price-wrapper">
                <p className="meal-price">{meal.price} kr.</p>
              </div>
            </div>
          );
        })}
      </div>
  );
}
