import React, { useContext } from "react";
import sadFaceSticker from "/public/notFound.jpg";
import "../components/styles/notFoundData.css";
import { MealContext } from "./MealContext";

export default function NotFoundData() {
  const { text } = useContext(MealContext);
  return (
    <div>
      <h1 className="not-found-message">
        Sorry! Can't find meal title under search {text}
      </h1>
      <img className="sad-face-sticker" src={sadFaceSticker} alt="notFoundSadFacePic"/>
    </div>
  );
}

