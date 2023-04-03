import React, { createContext, useState, useEffect } from "react";
export const MealContext = createContext();

export default function MealProvider({ children }) {
  const [meals, setMeals] = useState(null);
  const [mealDetails, setMealDetails] = useState([]);
  const [reservationDetails, setReservationDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isPostSuccessful, setIsPostSuccessful] = useState(false);
  const [stars, setStars] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("/api/meals/");
        const data = await response.json();
        setMeals(data);
        setisLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeals();
  }, []);

  const getAReservationByID = async (id) => {
    try {
      const response = await fetch(`/api/meals/${id}/reservations`);
      const data = await response.json();
      setReservationDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAMealByID = async (id) => {
    try {
      const response = await fetch(`api/meals/${id}`);
      const data = await response.json();
      const [mealInfo] = data;
      setMealDetails(mealInfo);

      return Number(mealInfo.available_slot) ? true : false;
    } catch (error) {
      console.log(error);
    }
  };

  const contextState = {
    meals,
    getAMealByID,
    mealDetails,
    reservationDetails,
    getAReservationByID,
    isLoading,
    setStars, 
    stars, 
    setIsPostSuccessful, 
    isPostSuccessful,
    isAvailable, 
    setIsAvailable
  };

  return (
    <>
      <MealContext.Provider value={contextState}>
        {children}
      </MealContext.Provider>
    </>
  );
}
