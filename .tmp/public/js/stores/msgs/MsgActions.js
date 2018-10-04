"use strict";

import MsgActionTypes from "./MsgActionTypes";
import MsgDispatcher from "./MsgDispatcher";

const Actions = {
  addMsg(msg) {
    MsgDispatcher.dispatch({
      type: MsgActionTypes.ADD_MSG,
      msg: msg
    });
  },

  updateMsg(msg) {
    MsgDispatcher.dispatch({
      type: MsgActionTypes.UPDATE_MSG,
      msg: msg
    });
  },

  removeMsg(msg) {
    MsgDispatcher.dispatch({
      type: MsgActionTypes.DELETE_MSG,
      msg: msg
    });
  },

  setMsgs(msgs) {
    MsgDispatcher.dispatch({
      type: MsgActionTypes.SET_MSGS,
      msgs: msgs
    });
  }
};

export default Actions;
