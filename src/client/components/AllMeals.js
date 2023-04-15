import React, { useContext } from "react";
import { MealContext } from "./MealContext";
import { Link } from "react-router-dom";
import foodPics from "/public/foodPics.jpg";
import NotFoundData from "./NotFoundData";
import SortBy from "./SortBy";
import "../../client/components/styles/allMeal.css";

export default function AllMeals() {
  const { meals, isFound } = useContext(MealContext);

  return isFound ? (
    <>
      <SortBy />
      <div className="meal-container">
        {meals?.map((meal) => {
          return (
            <div key={meal.id} className="meal-card">
              <div>
                <img src={foodPics} alt="foodSamplePic" />
              </div>
              <div className="meal-des-wrapper">
                <h3>{meal.title}</h3>
                <p>{meal.description}</p>
              </div>
              <div className="meal-price-wrapper">
                <p className="meal-price">{meal.price} kr.</p>
              </div>
              <div className="book-reservation-button-wrapper">
                <button className="book-reservation-button">
                  <Link to={`/meals/${meal.id}`}>Book</Link>
                </button>
                <button className="book-review-button">
                  <Link to={`/meals/${meal.id}/review`}>Review</Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <NotFoundData />
  );
}
