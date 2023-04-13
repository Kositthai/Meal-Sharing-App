import React from "react";
import { Link, useLocation } from "react-router-dom";
import MealSearcher from "./MealSearcher";
import "./styles/navbar.css";

export default function NavBar() {
  const location = useLocation();
  const navbarLinkPage = [
    {
      title: "All Meals",
      link_page: "/meals",
    },
    {
      title: "Reservation",
      link_page: "/meals",
    },
    {
      title: "Review",
      link_page: "/meals",
    },
  ];

  return (
    <div className="navbar-container">
      <p className="material-symbols-outlined logo">volunteer_activism</p>{" "}
      <ul className="navbar-ul">
        {navbarLinkPage.map((detail) => {
          return (
            <Link
              className="navbar-title"
              to={detail.link_page}
              key={detail.title}
            >
              {detail.title}
            </Link>
          );
        })}
        {location.pathname === "/meals" ? <MealSearcher /> : null}
      </ul>
    </div>
  );
}
