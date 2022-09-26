import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const Alert = ({ alertReducers }) =>
  // map is used to manipulate the array content: It will traverse the array and on every iteration it will give us the array content to manipulate the data
  alertReducers !== null &&
  alertReducers.length > 0 &&
  alertReducers.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alertReducers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  // state is refering to store
  alertReducers: state.alertReducers, // we can pass different name in the prop (like xyz), then we have to use xyz: state.alertReducers
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
