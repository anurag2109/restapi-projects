import React, { Fragment, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "./DashboardSlide.css";

const DashboardSlide = ({ movies, getMovies }) => {
  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <>
      {movies && (
        <div
          id="demo"
          className="carousel slide dashboard_carousel"
          data-ride="carousel"
        >
          {/* <!-- Indicators --> */}
          <ul className="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" className="active"></li>
            <li data-target="#demo" data-slide-to="1"></li>
            <li data-target="#demo" data-slide-to="2"></li>
          </ul>

          {/* <!-- The slideshow --> */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="dashboard__carousel__img"
                src="https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-101-10z5210808/cover/1920x7701d7b91f53df9e491dbc02c1fdcd0d7064.jpg"
                alt="Los Angeles"
              />
            </div>
            <div className="carousel-item">
              <img
                className="dashboard__carousel__img"
                src="https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-6-3273/cover/1920x770a06d5e9394ba4db3b00c6d3744792d8f.jpg"
                alt="Chicago"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-6-1179/cover/1920x77008fb4247f2564a75bf697846d37e12d6.jpg"
                alt="New York"
                className="dashboard__carousel__img"
              />
            </div>
          </div>

          {/* <!-- Left and right controls --> */}
          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
      )}
    </>
  );
};

export default DashboardSlide;
