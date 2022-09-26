import React, { Fragment, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "./Slides.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Slide = ({ movies, title }) => {
  useEffect(() => {}, [movies]);

  return (
    <div className="slideContainer">
      <p
        style={{
          fontSize: "22px",
          fontWeight: 600,
          lineHeight: "32px",
          marginRight: "25px",
        }}
      >
        {title}
      </p>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={false}
        centerMode={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.movieId}`}
            style={{ textDecoration: "none" }}
            key={movie.movieId}
          >
            <div className="sliderImgAndTextBox">
              <img
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/8774/1028774-v-85c7d8f07559"
                alt={movie.name}
                className="sliderImage"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: 600,
                    color: "",
                  }}
                >
                  {movie.movieName}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    fontSize: "12px",
                    padding: "0 8px",
                    marginBottom: "2px",
                    lineHeight: 1.4,
                  }}
                >
                  <p>{movie.movieLength}, </p>
                  <p>{movie.genre},</p>
                  <p>{movie.languages},</p>
                  <p>{movie.director},</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Slide;
