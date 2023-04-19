import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MealContext } from "./MealContext";
import ReservationForm from "./ReservationForm";
import foodPic from "/public/spencer-davis-vJsj-hgOEG0-unsplash.jpg";
import "./styles/mealDetail.css";
import Navbar from "./Navbar";

export default function MealDetail() {
  const {
    getAMealByID,
    mealDetails,
    isLoading,
    meals,
    isPostSuccessful,
    setIsPostSuccessful,
    isAvailable,
    setIsAvailable,
  } = useContext(MealContext);
  const [isIdExist, setIsIdExist] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (meals.length !== 0) {
      const mealID = meals.find((meal) => meal.id == Number(id));
      setIsIdExist(mealID);
    }

    if (isIdExist) {
      const fetchMealData = async (id) => {
        const isAvailable = await getAMealByID(id);
        setIsAvailable(isAvailable);
      };
      fetchMealData(id);
    } else {
      history.push("/");
    }
  }, [isPostSuccessful, meals, id, isIdExist]);

  if (!isLoading) return <p>Loading...</p>;

  const date = mealDetails.when ? mealDetails.when.slice(0, 10) : "";
  const result = new Date(date).toLocaleDateString("en-GB");

  return (
    <>
      {/* <Navbar /> */}
      <div className="reservation-and-a-meal">
        <div className="a-meal-container">
          <div className="a-meal-img-container">
            <img className="get-a-meal-image" src={foodPic} alt="food" />
          </div>
          <div>
            <h2 className="get-a-meal-h2">{mealDetails.title}</h2>
            <div className="what-would-you-get">
              <h4 className="what-would-you-get-msg">What would you get</h4>
              <p>{mealDetails.description}</p>
            </div>
            <div className="meal-details-group">
              <div className="get-a-meal-details">
                <h4>
                  <i className="fas fa-map-marker-alt"></i> Location
                </h4>
                <p className="meal-details-para">{mealDetails.location}</p>
              </div>
              <div className="get-a-meal-details">
                <h4>
                  <i className="fas fa-tag"></i> Price
                </h4>
                <p className="meal-details-para">{mealDetails.price} kr.</p>
              </div>
              <div className="get-a-meal-details">
                <h4>
                  <i className="far fa-calendar"></i> Collect
                </h4>
                <p className="meal-details-para"> {result}</p>
              </div>
            </div>
            <p className="available-reservation-info">
              Available reservation {mealDetails.available_slot}
            </p>
          </div>
        </div>

        <div className="reservation-container">
          {isAvailable ? (
            <ReservationForm
              mealDetails={mealDetails}
              setIsPostSuccessful={setIsPostSuccessful}
            />
          ) : (
            <p className="msg-fully-booked">This meal is fully booked</p>
          )}
        </div>
      </div>
    </>
  );
}
