import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MoviesAction = ({ movie, deleteMovieById }) => {
  const naviagte = useNavigate();
  return (
    <div className="dash-buttons">
      <Link
        to={`/movie/update-movie/${movie.movieId}`}
        className="btn btn-light"
      >
        <i className="fab fa-black-tie text-primary" /> Update Movie
      </Link>
      <button
        className="btn btn-danger"
        onClick={() => deleteMovieById(movie.movieId, naviagte)}
      >
        <i className="fas fa-graduation-cap text-primary" /> Delete Movie
      </button>
    </div>
  );
};

export default MoviesAction;
