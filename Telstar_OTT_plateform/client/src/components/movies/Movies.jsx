import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getCurrentProfile,
  deleteAccount,
} from "../../redux/actions/profileAction";

import { getMovies, getMovieByGenre } from "../../redux/actions/movieAction";
import Slide from "./Slide";
// user details : user from auth combineReducers
// profile : profile detail from profilr reducer
// based on token we need to retrieve the currentProfileDetails  ==> experience and educational details

export const Movies = ({
  auth: { user },
  getCurrentProfile, // this is action defined in profileAction
  profile: { profile }, // this came from profileReducer,
  deleteAccount,
  getMovies,
  movies: { movies },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getMovies();
  }, [getCurrentProfile, getMovies]);

  const navigate = useNavigate();
  const existingProfile = (
    <>
      <div className="dash-buttons">
        <Link to="/movie/add-movie" className="btn btn-light">
          <i className="fas fa-user-circle text-primary" /> Add Movie
        </Link>
      </div>
      <Slide movies={movies} title={"All movies"} />
    </>
  );
  const createProfile = (
    <>
      <p>You have not yet setup a profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-primary my-1">
        Create Profile
      </Link>
    </>
  );
  return (
    <section className="moviecontainer">
      <h1 className="large text-primary">Movies</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.firstName}
      </p>
      {existingProfile}
    </section>
  );
};

Movies.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired,
};

// here we used only reducer specification
const mapStateToProps = (state) => ({
  auth: state.authReducer,
  profile: state.profileReducer,
  movies: state.movieReducer,
});

// here we used only action specifications
const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount,
  getMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
