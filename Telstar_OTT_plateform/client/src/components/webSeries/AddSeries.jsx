import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addSerie } from "../../redux/actions/webSeriesAction";
import { useState } from "react";

const initialState = {
  webSeriesName: "",
  actors: "",
  languages: "",
  genre: "",
  production: "",
  director: "",
  webSeriesLength: "",
  trailer1: "",
};

export const AddSeries = ({ addSerie }) => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const {
    webSeriesName,
    actors,
    languages,
    genre,
    production,
    director,
    episodes,
    trailer1,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <section className="container">
      <h3 className="large text-primary mt-3">Add WebSeries</h3>

      <small>* = required field</small>
      <form
        className="form m-3"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
          addSerie(formData, navigate);
        }}
      >
        <div className="form-group row mb-3 mt-3">
          <label className="col-sm-4 col-form-label font-weight-bold">
            WebSeries Name:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="* WebSeries Name"
              name="webSeriesName"
              value={webSeriesName}
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
            Total Episodes:{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="Number of episodes"
              name="episodes"
              value={episodes}
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
  );
};

AddSeries.propTypes = {
  addSerie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { addSerie };

export default connect(mapStateToProps, mapDispatchToProps)(AddSeries);
