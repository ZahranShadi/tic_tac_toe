import React from "react";
import { Link } from "react-router-dom";
import PageLogo from "../components/PageLogo";
import "../styles/landingPageStyles.css";
import "../styles/buttonsStyles.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landingPageContainer">
      <h1>Tic Tac Toe</h1>
      <div className="horizontalSeparator" />
      <PageLogo />
      <div className="horizontalSeparator" />
      <div className="landingPageButtonsContainer">
        <Link to="/login">
          <button className="customButton">log in</button>
        </Link>
        <Link to="/register">
          <button className="customButton" id="reg_btn">
            <span>register </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;