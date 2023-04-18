import React, { createContext, useState, useEffect } from "react";
export const MealContext = createContext();

export default function MealProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [mealDetails, setMealDetails] = useState([]);
  const [reservationDetails, setReservationDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isPostSuccessful, setIsPostSuccessful] = useState(false);
  const [isDesc, setIsDesc] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [stars, setStars] = useState(0);
  const [selectSortValue, setSelectSortValue] = useState("id");
  const [text, setText] = useState("");
  const [isSortedByDesc, setIsSotedByDesc] = useState("");
  const [iconClassName, setIconClassName] = useState("fas fa-sort-amount-down");
  
  // fetch all meals that exist in database and render in AllMeals component
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

  // fetch meals by title from meal searcher bar
  useEffect(() => {
    const fetchMealByTitle = async () => {
      try {
        const response = await fetch(
          `/api/meals?title=${text}`
        );
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMealByTitle();
  }, [text, isFound]);

  // fetch meals based on sort value setting
  useEffect(() => {
    const fetchSortedBy = async () => {
      try {
        const response = await fetch(
          `/api/meals?sortKey=${selectSortValue}&sortDir=${isSortedByDesc}`
        );
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSortedBy();

    if (isDesc) {
      setIsSotedByDesc("DESC");
      setIconClassName("fas fa-sort-amount-up");
    } else {
      setIsSotedByDesc("ACS");
      setIconClassName("fas fa-sort-amount-down");
    }
    
  }, [selectSortValue, isSortedByDesc, isDesc]);

  useEffect(() => {
    meals.length === 0 ? setIsFound(false) : setIsFound(true);
  }, [meals]);

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
    setMeals,
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
    setIsAvailable,
    isFound,
    setIsFound,
    isDesc,
    setIsDesc,
    setSelectSortValue,
    selectSortValue,
    text,
    setText,
    iconClassName,
    setIconClassName,
  };

  return (
    <>
      <MealContext.Provider value={contextState}>
        {children}
      </MealContext.Provider>
    </>
  );
}
