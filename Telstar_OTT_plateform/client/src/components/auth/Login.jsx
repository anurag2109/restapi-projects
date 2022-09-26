import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../redux/actions/authAction";
import classnames from "classnames";

export const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({});

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated === true) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <section className="container">
        <div
          className={classnames({
            "alert alert-danger d-block invalid-feedback": error === null,
          })}
        >
          <div className="d-block invalid-feedback">{error.msg}</div>
        </div>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={onChange}
              value={username}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
              value={password}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// const mapStateToProps = (state) => ({}); // this is blank bcoz we are not accessing anything from store

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
