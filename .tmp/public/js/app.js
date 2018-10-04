import React from "react";
import ReactDOM from "react-dom";
import MsgListContainer from "./containers/MsgListContainer";

const Background = "../../images/background_image.png";

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: "url(" + Background + ")"
};

ReactDOM.render(React.createElement(MsgListContainer, { style: sectionStyle }), document.getElementById("application"));
