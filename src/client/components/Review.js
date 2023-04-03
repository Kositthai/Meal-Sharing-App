import React, { useContext, useReducer, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MealContext } from "./MealContext";
import { INITIAL_REVIEW_STATE, PostReducer } from "./PostReducer";

export default function Review() {
  const { reservationDetails, getAReservationByID, meals, stars, setStars } = useContext(MealContext);
  const [isIdExist, setIsIDMatched] = useState({});
  const [state, dispatch] = useReducer(PostReducer, INITIAL_REVIEW_STATE);
  const history = useHistory();
  const { id } = useParams();

  const reviewRate = [1, 2, 3, 4, 5];
  let hadReservedMeal = false;

  useEffect(() => {
    if (meals) {
      const mealID = meals.find((meal) => meal.id === Number(id));
      setIsIDMatched(mealID);
    }

    if (isIdExist) {
      const fetchReservation = async (id) => {
        const response = await getAReservationByID(id);
      };
      fetchReservation(id);
    } else {
      history.push("/");
    }
  }, [meals, id, isIdExist]);

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
    <section>
      <h3>Write a review</h3>
      <form onSubmit={(e) => submitReservationHandler(e)}>
        <label htmlFor="name">name</label>
        <input
          id="name"
          type="text"
          value={state.name}
          onChange={(e) => changeInputHandler(e)}
          required
        />

        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          value={state.email}
          onChange={(e) => changeInputHandler(e)}
          required
        />

        <label htmlFor="subject">subject</label>
        <input
          id="subject"
          type="text"
          maxLength={30}
          value={state.subject}
          onChange={(e) => changeInputHandler(e)}
        />

        {reviewRate.map((star, index) => {
          return (
            <i
              className="far fa-star"
              key={index}
              onClick={() => setStars(star)}
            ></i>
          );
        })}
        <label htmlFor="message">message</label>

        <textarea
          id="message"
          value={state.message}
          onChange={(e) => changeInputHandler(e)}
          maxLength={80}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
