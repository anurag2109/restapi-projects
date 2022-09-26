import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  getSerieById,
  updateSerieById,
} from "../../redux/actions/webSeriesAction";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const initialState = {
  webSeriesName: "",
  actors: "",
  languages: "",
  genre: "",
  production: "",
  director: "",
  episodes: "",
  trailer1: "",
};

export const UpdateSeries = ({
  series: { serie },
  getSerieById,
  updateSerieById,
}) => {
  const { id } = useParams();
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

  useEffect(() => {
    // if there is no profile, then attempt to fetch it.
    if (!serie) {
      getSerieById(id);
    }
    // for updating purpose, we need to extract data from profile field.
    if (serie) {
      // initialize the data.
      const profileData = { ...initialState };
      // copy the contents from profile to profileData.
      for (const key in serie) {
        // key: field name in profile json object.
        if (key in profileData) {
          profileData[key] = serie[key];
        }

        if (Array.isArray(serie.actors)) {
          profileData.actors = serie.actors.join(",");
        }
        if (Array.isArray(serie.languages)) {
          profileData.languages = serie.languages.join(",");
        }

        setFormData(profileData);
        //console.log(formData);
      }
    }
  }, [serie]);

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
          updateSerieById(id, formData, navigate);
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
              placeholder="* Number of Episodes"
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

UpdateSeries.propTypes = {
  series: PropTypes.object.isRequired,
  getSerieById: PropTypes.func.isRequired,
  updateSerieById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  series: state.webSeriesReducer,
});

const mapDispatchToProps = { getSerieById, updateSerieById };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSeries);
