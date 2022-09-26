import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../../redux/actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";

export const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const createProfile = (
    <>
      <p>You have not yet setup a profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-primary my-1">
        Create Profile
      </Link>
    </>
  );

  const displayProfiles = (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop" /> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles.length > 0
          ? profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          : createProfile}
      </div>
    </Fragment>
  );
  return (
    <section className="container">
      {loading ? <Spinner /> : displayProfiles}
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = { getProfiles };

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
