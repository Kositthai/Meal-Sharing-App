import React from "react";
import foodWaste from "../../../public/foodWaste.jpg";
import "./styles/foodWasteQuote.css"

export default function FoodWasteQuote() {
  return (
    <section className="subtitle-container">
      <img className="foodwaste-img" src={foodWaste} alt="foodwaste-img"/>
      <p className="subtitle-para">
        In many places in the developed world, we eat or waste 
        probably twice as much food calories as we really need. 
        We’re wasteful of food. We ship all over the world. 
        We’re not releasing that generating the energy to
        ship the food around the world is also ruining our climate.” <br></br>

        – Nina Federoff, notable American molecular biologist.
      </p>
    </section>
  );
}


