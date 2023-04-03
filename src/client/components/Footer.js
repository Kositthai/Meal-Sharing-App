import React from "react";
import "./styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="rgba(69, 154, 87, 0.885)"
          fillOpacity="1"
          d="M0,224L40,229.3C80,
        235,160,245,240,224C320,203,400,149,480,144C560,139,640,181,720,181.3C800,181,
        880,139,960,122.7C1040,107,1120,117,1200,128C1280,139,1360,149,1400,154.7L1440,
        160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,
        320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,
        320,40,320L0,320Z"
        ></path>
      </svg>
      <div className="footer-icon-container">
        <i className="fab fa-instagram footer-icon"></i>
        <i className="fab fa-facebook-f footer-icon"></i>
        <i className="fab fa-twitter footer-icon"></i>
      </div>
    </footer>
  );
}

