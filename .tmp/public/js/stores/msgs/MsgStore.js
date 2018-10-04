"use strict";

import { ReduceStore } from "flux/utils";
import MsgDispatcher from "./MsgDispatcher";
import MsgActionTypes from "./MsgActionTypes";

class MsgStore extends ReduceStore {
  constructor() {
    super(MsgDispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case MsgActionTypes.ADD_MSG:
        var newState = [action.msg].concat(state);
        return newState;
      case MsgActionTypes.UPDATE_MSG:
        var ids = state.map(function (msg) {
          return action.msg.id;
        });
        var index = ids.indexOf(action.msg.id);
        if (index >= 0) {
          state[index] = action.msg;
        }
        this.__emitChange();
        return state;
      case MsgActionTypes.DELETE_MSG:
        var newState = state.filter(function (msg) {
          return msg.id != action.msg.id;
        });
        return newState;
      case MsgActionTypes.SET_MSGS:
        return action.msgs;
      default:
        return state;
    }
  }
}

export default new MsgStore();
