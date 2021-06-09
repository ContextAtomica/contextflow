import React from "react";
import "./index.css";
import HomeImg from "../../assets/home.png";
function Landing() {
  return (
    <>
      <div className="home__hero-section">
        <div className="container">
          <div
            className="rows home__hero-row"
            style={{
              display: "flex",
              flexDirection: "rows",
            }}
          >
            <div className="cols">
              <div className="home__hero-text-wrapper">
                <div className="top-line">Lorem ipsum</div>
                <h1 className={"heading"}>Lorem ipsum </h1>
                <p className="home__hero-subtitle">
                  Lorem ipsum is placeholder text
                </p>
              </div>
            </div>
            <div className="cols">
              <div className="home__hero-img-wrapper">
                <img src={HomeImg} alt="hh" className="home__hero-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
