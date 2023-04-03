import React, { useContext } from "react";
import { MealContext } from "./MealContext";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import HomepageTextAnimation from "./HomepageTextAnimation";
import FoodWasteQuote from "./FoodWasteQuote";
import "./styles/homepage.css";

export default function HomePage() {
  const { meals } = useContext(MealContext);

  return meals ? (
    <>
      <NavBar />
      <FoodWasteQuote />
      <HomepageTextAnimation />
      <ul>
        {meals.slice(0, meals.length - 2).map((meal) => {
          return (
            <li key={meal.id}>
              <Link to={`meals/${meal.id}`}>{meal.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="link-to-page">
        <Link to={"/meals"}>
          View More
          <br />
          <br />
          <i className="far fa-arrow-alt-circle-down"></i>
        </Link>
      </div>
      <Footer />
    </>
  ) : (
    <p>Loading...</p>
  );
}

