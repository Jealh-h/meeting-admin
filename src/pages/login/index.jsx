import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Login extends React.Component {
  render() {
    return <Link to="/index/meeting-room">login</Link>;
  }
}

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({
  adminApi: dispatch.admin,
});

export default connect(mapState, mapDispatch)(Login);
