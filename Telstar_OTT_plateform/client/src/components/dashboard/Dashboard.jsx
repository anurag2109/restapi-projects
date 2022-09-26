import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import DashboardSlide from "./DashboardSlide";
import Slide from "../movies/Slide";
import SeriesSlide from "../webSeries/SeriesSlide";
import { getMovies } from "../../redux/actions/movieAction";
import { getSeries } from "../../redux/actions/webSeriesAction";
import { Navigate } from "react-router-dom";

export const Dashboard = ({
  movies: { movies },
  series: { series },
  getMovies,
  getSeries,
  auth: { isAuthenticated },
}) => {
  useEffect(() => {
    getMovies();
    getSeries();
  }, [getMovies, getSeries]);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <DashboardSlide movies={movies} getMovies={getMovies} />

      {movies && <Slide movies={movies} title={"Movies"} />}
      {series && <SeriesSlide series={series} title={"Web Series"} />}
    </>
  );
};

Dashboard.propTypes = {
  movies: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movieReducer,
  series: state.webSeriesReducer,
  auth: state.authReducer,
});

const mapDispatchToProps = { getMovies, getSeries };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
