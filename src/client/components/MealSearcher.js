import React from "react";
import { useContext } from "react";
import { MealContext } from "./MealContext";
import "../../client/components/styles/mealSearcher.css";

export default function MealSearcher() {
  const { text, setText } = useContext(MealContext);

  return (
    <div className="search-bar-wrapper">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Type to search"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </div>
  );
}
