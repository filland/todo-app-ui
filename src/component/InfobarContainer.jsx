import React from "react";
import { connect } from "react-redux";
import Infobar from "./Infobar";
import { INFOBAR_MESSAGE_UPDATE } from "../reducer/InfobarReducer";

class InfobarContainer extends React.Component {
  render() {
    let settings = {
      message: this.props.infobarMessage,
      close: this.props.clearInfobar
    };

    return <Infobar settings={settings}></Infobar>;
  }
}

export const clearInfobar = () => {
  return dispatch => {
    dispatch({
      type: INFOBAR_MESSAGE_UPDATE,
      payload: { message: null, type: null, show: false }
    });
  };
};

const mapStateToProps = store => {
  return {
    infobarMessage: store.infobar
  };
};

const mapDispatchToProps = dispatch => {
  return {
      clearInfobar: () => dispatch(clearInfobar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfobarContainer);
