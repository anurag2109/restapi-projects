import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Spinner from "../components/common/Spinner";
import Login from "../components/auth/Login";
// this one is the decision maker to allow to render the component or not
export const PrivateRoutes = ({
  component: Component,
  auth: { isAuthenticated, loading },
}) =>
  // component : name of the component to confirm the access to render
  // auth : name of the reducer from the store
  // loading: status of the render the spinner component
  // isAuthenticated: to give the direct access to render the component
  {
    if (!isAuthenticated) {
      return <Login />;
    }
    if (loading) {
      return <Spinner />;
    }
    if (isAuthenticated) {
      return <Component />;
    }
  };

PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);
