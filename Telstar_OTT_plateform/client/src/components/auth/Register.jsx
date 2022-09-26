import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { register } from "../../redux/actions/authAction";
import { setAlert } from "../../redux/actions/alertAction";

// props declaration: will have list of actions, and reducer initial state specs. Here only register() function is passsed as props because for registration we don't need any thing access from store. We need to store state in store hence action[i.e, register()] will be need
const Register = ({ register, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    doj: "",
    dob: "",
    username: "",
    password: "",
    password2: "",
  });

  const {
    firstName,
    lastName,
    email,
    doj,
    dob,
    username,
    password,
    password2,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      return setAlert("password did not match", "danger", 3000);
    }

    // action will be called here
    register({ firstName, lastName, email, doj, dob, username, password });
  };

  if (isAuthenticated === true) {
    return <Navigate to="/dashboard"></Navigate>;
  }
  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={firstName}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={lastName}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            // required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        {/* <div className="form-group">
          <h4>Joining Date</h4>
          <input type="date" name="doj" value={doj} onChange={onChange} />
        </div>
        <div className="form-group">
          <h4>Date Of Birth</h4>
          <input type="date" name="dob" value={dob} onChange={onChange} />
        </div> */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired, // telling the controller that pls treat "register" as a function and without "register" it will not work hence "isRequired" is given
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// this is blank bcoz we are not accessing anything from store
// const mapStateToProps = (state) => ({});

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

const mapDispatchToProps = { register, setAlert }; // provide list of action to be used in the component

// connect() method is used to connect to store to component
export default connect(mapStateToProps, mapDispatchToProps)(Register); // will accept (mapStateToProps, list of dispatching actions)  ===> will help us to connect your component to the store/redux environment.
