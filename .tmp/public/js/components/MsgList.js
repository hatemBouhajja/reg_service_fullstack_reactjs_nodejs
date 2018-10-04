import React from "react";
import MsgActions from "../stores/msgs/MsgActions";
import * as API from "../api/api";
import { Button, Input, Table } from "reactstrap";

const Background = "../../images/background_image.png";
const Rocket = "../../images/rocket_contact.png";

var sectionStyle = {
  position: "fixed",
  width: "100%",
  marginTop: "-100px",
  height: "150%",
  zIndex: "-1",
  backgroundrepeat: "no-repeat",
  backgroundImage: "url(" + Background + ")"
};

var rocketStyle = {
  position: "fixed",
  width: "100px",
  marginTop: "-150px",
  height: "100px",
  zIndex: "9999",
  backgroundrepeat: "no-repeat",
  backgroundImage: "url(" + Rocket + ")"
};

class CreateMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      title: "",
      user: "",
      email: "",
      phone: ""
    };
  }

  onClick(event) {
    if (this.state.description.length > 0) {
      API.msgs.add(this.state.description, this.state.title, this.state.user, this.state.email, this.state.phone, response => {
        this.setState({
          description: "",
          title: "",
          user: "",
          email: "",
          phone: ""
        });
        MsgActions.addMsg(response.json);
      });
    }
  }

  onChange(event) {
    this.setState({ description: event.target.value });
  }

  onChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  onChangeUser(event) {
    this.setState({ user: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangePhone(event) {
    this.setState({ phone: event.target.value });
  }

  render() {
    return React.createElement(
      "div",
      {
        style: {
          width: "60%"
        },
        className: "row"
      },
      React.createElement(
        "form",
        { className: "col" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: " col" },
            React.createElement(Input, {
              placeholder: "Nom d'utilisateur",
              type: "text",
              name: "user",
              value: this.state.user,
              onChange: e => this.onChangeUser(e)
            })
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col" },
            React.createElement(Input, {
              type: "text",
              name: "email",
              placeholder: "Email",
              value: this.state.email,
              onChange: e => this.onChangeEmail(e)
            })
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col" },
            React.createElement(Input, {
              type: "text",
              name: "phone",
              placeholder: "T\xE9l\xE9phone",
              value: this.state.phone,
              onChange: e => this.onChangePhone(e)
            }),
            React.createElement("br", null),
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                Button,
                {
                  style: {
                    marginLeft: "13px"
                  },
                  color: "primary",
                  onClick: e => this.onClick(e)
                },
                "Envoyer le message"
              )
            )
          )
        )
      ),
      React.createElement(
        "form",
        { className: "col" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col" },
            React.createElement(Input, {
              type: "text",
              name: "title",
              placeholder: "Titre",
              value: this.state.title,
              onChange: e => this.onChangeTitle(e)
            })
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col" },
            React.createElement(Input, {
              style: {
                height: "100px"
              },
              className: "textarea",
              type: "textarea",
              name: "description",
              placeholder: "Votre message",
              value: this.state.description,
              onChange: e => this.onChange(e)
            })
          )
        )
      )
    );
  }
}

class DeleteMsg extends React.Component {
  onClick(event) {
    API.msgs.remove(this.props.msg.id, function (response) {
      MsgActions.removeMsg(response.json);
    });

    event.stopPropagation();
  }

  render() {
    return React.createElement(
      Button,
      {
        style: { float: "right" },
        color: "danger",
        onClick: e => this.onClick(e)
      },
      "Annuler"
    );
  }
}

class Msg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "span",
        null,
        this.props.msg
      )
    );
  }
}

class MsgList extends React.Component {
  constructor(props) {
    super(props);
    API.msgs.getAll(response => {
      MsgActions.setMsgs(response.json);
    });
  }

  render() {
    var msgs = this.props.msgs.map((msg, index) => {
      return React.createElement(
        Table,
        { striped: true },
        React.createElement(
          "tbody",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement("th", { scope: "row" }),
            React.createElement(
              "td",
              null,
              React.createElement(Msg, { msg: msg.title })
            ),
            React.createElement(
              "td",
              null,
              React.createElement(DeleteMsg, { msg: msg })
            )
          )
        )
      );
    });

    return React.createElement(
      "div",
      null,
      React.createElement("div", { style: sectionStyle }),
      React.createElement(
        "div",
        {
          style: {
            float: "center",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        },
        React.createElement("div", {
          style: {
            backgroundColor: "#FFFFFF",
            height: "450px",
            width: "70%",
            marginTop: "100px"
          }
        }),
        React.createElement("div", { style: rocketStyle }),
        React.createElement(
          "div",
          {
            style: {
              position: "absolute",
              marginRight: "200px",
              color: "#075EF2",
              fontSize: "40px",
              marginTop: "-70px",
              width: "300px"
            }
          },
          "Contactez Nous"
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: "-270px"
          },
          className: "row"
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            },
            className: "col"
          },
          React.createElement(CreateMsg, null)
        )
      )
    );
  }
}

export default MsgList;
