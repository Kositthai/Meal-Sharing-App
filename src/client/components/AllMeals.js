import { MealContext } from "./MealContext";
import React, { useContext } from "react";
import "./styles/AllMeal.css";
import foodPics from "../../../public/foodPics.jpg";
import { Link } from "react-router-dom";

export default function AllMeals() {
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
            <Link to={`/meals/${meal.id}`}>Book</Link>       
            <Link to={`/meals/${meal.id}/review`}>Review</Link>
          </div>
        );
      })}
    </div>
  );
}
