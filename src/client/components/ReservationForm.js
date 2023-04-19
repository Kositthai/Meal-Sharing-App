import React, { useReducer } from "react";
import { INITIAL_RESERVATION_STATE, PostReducer } from "./PostReducer";
import "./styles/reservationForm.css";

export default function ReservationForm({ mealDetails, setIsPostSuccessful }) {
  const [state, dispatch] = useReducer(PostReducer, INITIAL_RESERVATION_STATE);
  let availableSlotCovered = false;

  const submitReservationHandler = async (e) => {
    e.preventDefault();

    const body = {
      number_of_guests: state.number_of_guests,
      meal_id: mealDetails.id,
      contact_phonenumber: state.phone_number,
      contact_name: state.name,
      contact_email: state.email,
    };

    body.number_of_guests <= mealDetails.available_slot
      ? (availableSlotCovered = true)
      : alert("Available meals is not cover the number of guests that you trying to book!");

    if (availableSlotCovered) {
      try {
        const response = await fetch("api/reservations/", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          alert("Reservation book successfully");
          setIsPostSuccessful(true);
          dispatch({ type: "CLEAR_RESERVATION_FORM" });
        }
      } catch (error) {
        alert("Sorry, there was a problem in operation");
        console.log(error);
      }
    }
    setIsPostSuccessful(false);
    // set this to false because if when it set to true useEffect in mealDeTails will re-render again but for the second time isPostSuccesful will remain true so even
    // and mealDetails will not update available_slot which will allow you to over book meal
  };

  const changeHandler = (e) => {
    const phoneNumber = e.target.value;

    if (e.target.id === "phone_number") {
      const pattarn = /^[0-9]+$/;
      if (phoneNumber.length !== 0) {
        if (!pattarn.test(phoneNumber)) {
          return alert("Invalid input. Please insert only number");
        }
      }
    }

    dispatch({
      type: "CHANGE_INPUT",
      payload: { id: e.target.id, value: e.target.value },
    });
  };

  return (
    <form className="meal-reservation" onSubmit={submitReservationHandler}>
      <h2 className="meal-reservation-header">Meal Reservation</h2>
      <div className="reservation-info">
        <label className="label-form" htmlFor="name">
          Name
        </label>
        <input
          type={"text"}
          id="name"
          onChange={(e) => changeHandler(e)}
          value={state.name}
          required
        />
      </div>
      <div className="reservation-info">
        <label className="label-form" htmlFor="email">
          Email
        </label>
        <input
          type={"email"}
          id="email"
          onChange={(e) => changeHandler(e)}
          value={state.email}
          required
        />
      </div>
      <div className="reservation-info">
        <label className="label-form" htmlFor="number_of_guests">
          Number of guest
        </label>
        <input
          type={"number"}
          id="number_of_guests"
          onChange={(e) => changeHandler(e)}
          value={state.number_of_guests}
          min={1}
          required
        />
      </div>
      <div className="reservation-info">
        <label className="label-form" htmlFor="phone_number">
          Phone Number (+45){" "}
        </label>
        <input
          type={"tel"}
          id="phone_number"
          onChange={(e) => changeHandler(e)}
          value={state.phone_number}
          maxLength={8}
          minLength={8}
        />
      </div>
      <div className="book-now-button-wrapper">
        <button className="book-now-button" type="submit">
          Book Now
        </button>
      </div>
    </form>
  );
}
