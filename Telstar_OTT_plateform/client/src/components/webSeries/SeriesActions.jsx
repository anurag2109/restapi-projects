import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SeriesAction = ({ serie, deleteSerieById }) => {
  const naviagte = useNavigate();
  return (
    <div className="dash-buttons">
      <Link
        to={`/webseries/updateSeries/${serie.webSeriesId}`}
        className="btn btn-light"
      >
        <i className="fab fa-black-tie text-primary" /> Update Series
      </Link>
      <button
        className="btn btn-danger"
        onClick={() => deleteSerieById(serie.webSeriesId, naviagte)}
      >
        <i className="fas fa-graduation-cap text-primary" /> Delete Series
      </button>
    </div>
  );
};

export default SeriesAction;
