import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MealSearcher from "./MealSearcher";
import "./styles/navbar.css";

export default function NavBar() {
  const location = useLocation();
  const navbarLinkPage = [
    {
      title: "About Us",
      link_page: "/meals",
    },
    {
      title: "All Meals",
      link_page: "/meals",
    },
    {
      title: "Contact",
      link_page: "/meals",
    },
  ];

  return (
    <div className="navbar-container">
      <Link to={"/"} className="material-symbols-outlined logo">
        volunteer_activism
      </Link>
      <ul className="navbar-pc-version">
        {location.pathname === "/meals"
          ? null
          : navbarLinkPage.map((detail) => {
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
