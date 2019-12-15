import React from "react";
import { connect } from "react-redux";
import Infobar from "./Infobar";
import { INFOBAR_MESSAGE_UPDATE } from "../reducer/TodoReducer";

class InfobarContainer extends React.Component {
  render() {
    let settings = this.props.infobarMessage;

    return <Infobar settings={settings}></Infobar>;
  }
}

export const clearInfobar = dispatch => {
  return dispatch => {
    dispatch({
      type: INFOBAR_MESSAGE_UPDATE,
      payload: { message: null, type: null, show: false }
    });
  };
};

const mapStateToProps = store => {
  return {
    infobarMessage: store.todos.infobarMessage
  };
};

export default connect(mapStateToProps)(InfobarContainer);
