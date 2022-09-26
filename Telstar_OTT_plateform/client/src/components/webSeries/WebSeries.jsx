import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getCurrentProfile,
  deleteAccount,
} from "../../redux/actions/profileAction";

import { getSeries } from "../../redux/actions/webSeriesAction";
import Slide from "./SeriesSlide";
// user details : user from auth combineReducers
// profile : profile detail from profilr reducer
// based on token we need to retrieve the currentProfileDetails  ==> experience and educational details

export const WebSeries = ({
  auth: { user },
  getCurrentProfile, // this is action defined in profileAction
  profile: { profile }, // this came from profileReducer,
  deleteAccount,
  getSeries,
  series: { series },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getSeries();
  }, [getCurrentProfile, getSeries]);

  const navigate = useNavigate();
  const existingProfile = (
    <>
      <div className="dash-buttons">
        <Link to="/webseries/addSeries" className="btn btn-light">
          <i className="fas fa-user-circle text-primary" /> Add Series
        </Link>
      </div>
      <Slide series={series} title={"All Web Series"} />
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
    <section className="seriescontainer">
      <h1 className="large text-primary">Web Series</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.email}
      </p>
      {existingProfile}
    </section>
  );
};

WebSeries.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getSeries: PropTypes.func.isRequired,
  series: PropTypes.object.isRequired,
};

// here we used only reducer specification
const mapStateToProps = (state) => ({
  auth: state.authReducer,
  profile: state.profileReducer,
  series: state.webSeriesReducer,
});

// here we used only action specifications
const mapDispatchToProps = { getCurrentProfile, deleteAccount, getSeries };

export default connect(mapStateToProps, mapDispatchToProps)(WebSeries);
