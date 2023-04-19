import React, { useContext, useEffect, useState } from "react";
import { MealContext } from "./MealContext";
import "../components/styles/sortby.css";

export default function SortBy() {
  const sortedList = ["Price", "Max_Reservation", "When"];
  const { setIsDesc, setSelectSortValue, iconClassName } =
    useContext(MealContext);

  return (
    <div className="sortby-container">
      <select
        className="sortby-wrapper"
        id="sortby"
        defaultValue={""}
        onChange={(e) => setSelectSortValue(e.target.value)}
      >
        <option className="sortby-placeholder" value={""} disabled="disabled">
          --- Sort by ---
        </option>
        {sortedList.map((title) => {
          return (
            <option key={title} value={title}>
              {title}
            </option>
          );
        })}
      </select>
      <i
        className={iconClassName}
        onClick={() => setIsDesc((previous) => !previous)}
      ></i>
    </div>
  );
}
