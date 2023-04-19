import React, { useContext, useReducer, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MealContext } from "./MealContext";
import { INITIAL_REVIEW_STATE, PostReducer } from "./PostReducer";
import "../components/styles/review.css";
import Navbar from "./Navbar"; 
let hadReservedMeal = false;

export default function Review() {
  const { reservationDetails, getAReservationByID, meals, stars, setStars } =
    useContext(MealContext);
  const [isIdExist, setIsIdExist] = useState({});
  const [state, dispatch] = useReducer(PostReducer, INITIAL_REVIEW_STATE);
  const history = useHistory();
  const { id } = useParams();
  const reviewRate = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (meals.length !== 0) {
      const mealID = meals.find((meal) => meal.id === Number(id));
      setIsIdExist(mealID);
    }

    if (isIdExist) {
      const fetchReservation = async (id) => {
        try {
          const response = await getAReservationByID(id);
        } catch (error) {
          console.log(error);
        }
      };
      fetchReservation(id);
    } else {
      history.push("/");
    }
  }, [meals, isIdExist]);

  const submitReservationHandler = async (e) => {
    e.preventDefault();

    const body = {
      title: state.subject,
      description: state.message,
      meal_id: id,
      stars: stars,
    };

    reservationDetails &&
      reservationDetails.forEach((reservation) => {
        if (
          reservation.contact_name.toLowerCase() === state.name.toLowerCase() &&
          reservation.contact_email === state.email
        ) {
          hadReservedMeal = true;
        }
      });

    if (hadReservedMeal) {
      try {
        const response = await fetch("api/reviews/", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          alert("Submit your review successfully.");
          dispatch({ type: "CLEAR_REVIEW_FORM" });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(
        "Sorry. You can't write review until you have book the reservation"
      );
    }
  };

  const changeInputHandler = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { id: e.target.id, value: e.target.value },
    });
  };

  return (
    <>
    <Navbar />
    <section className="review-container">
      <div className="review-wrapper">
        <h3>Write a review</h3>
        <form
          onSubmit={(e) => submitReservationHandler(e)}
          className="review-form"
        >
          <div className="review-information">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={state.name}
              onChange={(e) => changeInputHandler(e)}
              required
              className="review-input"
            />
          </div>

          <div className="review-information">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={state.email}
              onChange={(e) => changeInputHandler(e)}
              required
              className="review-input"
            />
          </div>

          <div className="review-information">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              maxLength={30}
              value={state.subject}
              onChange={(e) => changeInputHandler(e)}
              className="review-input"
            />
          </div>
          <div className="review-information">
            <label htmlFor="star">Rate</label>
            <div className="review-input">
              {reviewRate.map((star, index) => {
                return (
                  <i
                    id="star"
                    className={
                      stars >= star
                        ? "far fa-star star-selected"
                        : "far fa-star"
                    }
                    key={index}
                    onClick={() => setStars(star)}
                  ></i>
                );
              })}
            </div>
          </div>

          <div className="review-information">
            <label htmlFor="message">Message</label>
            <textarea
              className="review-input"
              id="message"
              value={state.message}
              onChange={(e) => changeInputHandler(e)}
              maxLength={80}
            ></textarea>
          </div>

          <button className="review-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
    </>
  );
}
