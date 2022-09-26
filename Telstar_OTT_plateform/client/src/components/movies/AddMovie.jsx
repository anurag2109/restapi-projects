import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addMovie } from "../../redux/actions/movieAction";

const initialState = {
  movieName: "",
  actors: "",
  languages: "",
  genre: "",
  production: "",
  director: "",
  movieLength: "",
  trailer1: "",
  file: "",
};

const AddMovie = ({ addMovie }) => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const {
    movieName,
    actors,
    languages,
    genre,
    production,
    director,
    movieLength,
    trailer1,
    file,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <section className="container">
      <h3 className="large text-primary mt-3">Add Movie</h3>

      <small>* = required field</small>
      <form
        className="form m-3"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
          addMovie(formData, navigate);
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
        <div className="form-group row mb-3">
          <label className="col-sm-4 col-form-label font-weight-bold">
            Image:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name="file"
              value={file}
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
  );
};

AddMovie.propTypes = {
  //  second: PropTypes.third,
  addMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { addMovie };

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);
