import { Container } from "flux/utils";
import React from "react";
import MsgStore from "../stores/msgs/MsgStore";
import MsgList from "../components/MsgList";

class MsgListContainer extends React.Component {
  static getStores() {
    return [MsgStore];
  }

  static calculateState(prevState) {
    return {
      msgs: MsgStore.getState()
    };
  }

  render() {
    return React.createElement(MsgList, { msgs: this.state.msgs });
  }
}

export default Container.create(MsgListContainer);
