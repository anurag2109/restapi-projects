import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMovieById,
  deleteMovieById,
  getMovieByGenre,
} from "../../redux/actions/movieAction";
import MoviesAction from "./MoviesAction";
import "./SingleMovieStyle.css";
import Slide from "./Slide";

export const SingleMovie = ({
  getMovieById,
  movie: { movie },
  genreBasedMovies: { genreBasedMovies },
  deleteMovieById,
  getMovieByGenre,
}) => {
  const { id } = useParams();
  const [oldMovieName, setOldMovieName] = useState(null);
  const [oldId, setOldId] = useState(null);

  useEffect(() => {
    if (oldId != id) {
      getMovieById(id);
    }

    if (movie && (oldMovieName == null || oldMovieName != movie.movieName)) {
      getMovieByGenre(movie.genre);
      setOldMovieName(movie.movieName);
      setOldId(movie.movieId);
    }
  }, [movie, id]);

  return (
    <div className="singlemovie__container">
      {movie && (
        <div style={{ color: "white" }}>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <img
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/8773/1028773-h-48170a73363e"
                alt="movie banner"
                style={{ height: "70vh" }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="movieDetails">
                  <p style={{ fontWeight: 600 }}>{movie.movieName}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="movieDetails">
                    <p>
                      {movie.languages}
                      <span style={{ fontWeight: 600 }}>&nbsp;.&nbsp;</span>
                    </p>
                  </div>
                  <div className="movieDetails">
                    <p>
                      {movie.movieLength}
                      <span style={{ fontWeight: 600 }}>&nbsp;.&nbsp;</span>
                    </p>
                  </div>
                  <div className="movieDetails">
                    <p>
                      {movie.genre}
                      <span style={{ fontWeight: 600 }}>&nbsp;.&nbsp;</span>
                    </p>
                  </div>
                  <div className="movieDetails">
                    <p>
                      {movie.director}
                      <span style={{ fontWeight: 600 }}>&nbsp;.&nbsp;</span>
                    </p>
                  </div>
                  <div className="movieDetails">
                    <p>
                      {movie.production}
                      <span style={{ fontWeight: 600 }}>&nbsp;.&nbsp;</span>
                    </p>
                  </div>
                </div>
                <MoviesAction movie={movie} deleteMovieById={deleteMovieById} />
              </div>
            </div>
          </div>
          <div>
            <Slide movies={genreBasedMovies} title={"Recomandation for you"} />
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

SingleMovie.propTypes = {
  getMovieById: PropTypes.func.isRequired,
  deleteMovieById: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  genreBasedMovies: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movieReducer,
  genreBasedMovies: state.movieReducer,
});

const mapDispatchToProps = { getMovieById, deleteMovieById, getMovieByGenre };

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
