import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById, updateMovieById } from "../../redux/actions/movieAction";
import { Link } from "react-router-dom";

const initialState = {
  movieName: "",
  actors: "",
  languages: "",
  genre: "",
  production: "",
  director: "",
  movieLength: "",
  trailer1: "",
};

const UpdateMovie = ({ movie: { movie }, getMovieById, updateMovieById }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const {
    movieName,
    actors,
    languages,
    genre,
    production,
    director,
    movieLength,
    trailer1,
  } = formData;
  const navigate = useNavigate();
  useEffect(() => {
    // if there is no profile, then attempt to fetch it.
    if (!movie) {
      getMovieById(id);
    }
    // for updating purpose, we need to extract data from profile field.
    if (movie) {
      // initialize the data.
      const profileData = { ...initialState };
      // copy the contents from profile to profileData.
      for (const key in movie) {
        // key: field name in profile json object.
        if (key in profileData) {
          profileData[key] = movie[key];
        }

        // convert skills array into single string.
        if (Array.isArray(movie.actors)) {
          profileData.actors = movie.actors.join(",");
        }
        if (Array.isArray(movie.languages)) {
          profileData.languages = movie.languages.join(",");
        }

        setFormData(profileData);
        //console.log(formData);
      }
    }
  }, [movie]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h3 className="large text-primary mt-3">Update Movie</h3>

      <small>* = required field</small>
      <form
        className="form m-3"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
          updateMovieById(id, formData, navigate);
        }}
      >
        <div className="form-group row mb-3 mt-3">
          <label className="col-sm-4 col-form-label font-weight-bold">
            Movie Name:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="* Movie Name"
              name="movieName"
              value={movieName}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="form-group row mb-3">
          <label className="col-sm-4 col-form-label font-weight-bold">
            Actors:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="* Actors"
              name="actors"
              value={actors}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="form-group row mb-3">
          <label className="col-sm-4 col-form-label font-weight-bold">
            Languages:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="* Languages"
              name="languages"
              value={languages}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="form-group row mb-3">
          <label className="col-sm-4 col-form-label font-weight-bold">
            Director:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="* Director"
              name="director"
              value={director}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="form-group row mb-3">
          <label className="col-sm-4 col-form-label font-weight-bold">
            Production:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="* Production"
              name="production"
              value={production}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="form-group row mb-3">
          <label className="col-sm-4 col-form-label font-weight-bold">
            Movie Length:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="* HH:mm:ss"
              name="movieLength"
              value={movieLength}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="form-group row mb-3">
          <label className="col-sm-4 col-form-label font-weight-bold">
            Genre:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="* Genre"
              name="genre"
              value={genre}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="container mt-3">
          <button type="submit" className="btn btn-primary mx-1">
            Submit
          </button>
          <Link className="btn btn-outline-dark mx-1" to="/dashboard">
            Go Back
          </Link>
        </div>
      </form>
    </section>
    //<div>Loaded</div>
  );
};

UpdateMovie.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovieById: PropTypes.func.isRequired,
  updateMovieById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movieReducer,
});

const mapDispatchToProps = { getMovieById, updateMovieById };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMovie);
