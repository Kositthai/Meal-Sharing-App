import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

export default function NavBar() {
  const navbarDetails = ["All Meals", "Reservation", "Review"];

  return (
    <div className="navbar-container">
      <p className="material-symbols-outlined logo">volunteer_activism</p>
      <ul className="navbar-ul">
        {navbarDetails.map((detail) => {
          return (
            <Link className="link" key={detail}>
              {detail}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

