import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import {
  getCurrentProfile,
  createProfile,
} from "../../redux/actions/profileAction";
const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};
const CreateProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  // state : useState

  const [formData, setFormData] = useState(initialState);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;
  // button : which help us to display the social buttons
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const navigate = useNavigate();
  // history object to navigate to other components from coding side.
  // CBC FBC : navigateHook.

  useEffect(() => {
    // if there is no profile , attempt to fetch the profile details from
    if (!profile) getCurrentProfile();
    // if we finised loading and we do have a profile , display
    // then build our profiledata(state)
    if (!loading && profile) {
      // initial the profile data to hold the key ,value json spec.

      const profileData = { ...initialState };
      // copy the contents from profile to profileData or
      // so that we can hold it in our state for further manipulation.
      for (const key in profile) {
        // key is the name of the attribute or field in the profile json object
        // value : the value of the attribute in the profile json object

        if (key in profileData) {
          profileData[key] = profile[key];
        }
        for (const key in profile.social) {
          if (key in profileData) profileData[key] = profile.social[key];
        }
        // transform the skills array into a single string
        if (Array.isArray(profile.skills))
          profileData.skills = profile.skills.join(", ");
      }
      setFormData(profileData);
    }
  }, [getCurrentProfile, loading, profile]);
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  const creatingProfile = useMatch("/create-profile");
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const socialMedia = (
    <Fragment>
      <div className="form-group social-input">
        <i className="fab fa-twitter fa-2x" />
        <input
          type="text"
          placeholder="Twitter URL"
          name="twitter"
          value={twitter}
          onChange={onChange}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-facebook fa-2x" />
        <input
          type="text"
          placeholder="Facebook URL"
          name="facebook"
          value={facebook}
          onChange={onChange}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-youtube fa-2x" />
        <input
          type="text"
          placeholder="YouTube URL"
          name="youtube"
          value={youtube}
          onChange={onChange}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-linkedin fa-2x" />
        <input
          type="text"
          placeholder="Linkedin URL"
          name="linkedin"
          value={linkedin}
          onChange={onChange}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-instagram fa-2x" />
        <input
          type="text"
          placeholder="Instagram URL"
          name="instagram"
          value={instagram}
          onChange={onChange}
        />
      </div>
    </Fragment>
  );
  return (
    <section className="container">
      <h1 className="large text-primary">
        {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile
          ? ` Let's get some information to make your`
          : " Add some changes to your profile"}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && socialMedia}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = { createProfile, getCurrentProfile };

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
