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
      API.msgs.add(
        this.state.description,
        this.state.title,
        this.state.user,
        this.state.email,
        this.state.phone,
        response => {
          this.setState({
            description: "",
            title: "",
            user: "",
            email: "",
            phone: ""
          });
          MsgActions.addMsg(response.json);
        }
      );
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
    return (
      <div
        style={{
          width: "60%"
        }}
        className="row"
      >
        <form className="col">
          <div className="row">
            <div className=" col">
              <Input
                placeholder="Nom d'utilisateur"
                type="text"
                name="user"
                value={this.state.user}
                onChange={e => this.onChangeUser(e)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <Input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.onChangeEmail(e)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <Input
                type="text"
                name="phone"
                placeholder="Téléphone"
                value={this.state.phone}
                onChange={e => this.onChangePhone(e)}
              />
              <br />
              <div className="row">
                <Button
                  style={{
                    marginLeft: "13px"
                  }}
                  color="primary"
                  onClick={e => this.onClick(e)}
                >
                  Envoyer le message
                </Button>
              </div>
            </div>
          </div>
        </form>

        <form className="col">
          <div className="row">
            <div className="col">
              <Input
                type="text"
                name="title"
                placeholder="Titre"
                value={this.state.title}
                onChange={e => this.onChangeTitle(e)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <Input
                style={{
                  height: "100px"
                }}
                className="textarea"
                type="textarea"
                name="description"
                placeholder="Votre message"
                value={this.state.description}
                onChange={e => this.onChange(e)}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class DeleteMsg extends React.Component {
  onClick(event) {
    API.msgs.remove(this.props.msg.id, function(response) {
      MsgActions.removeMsg(response.json);
    });

    event.stopPropagation();
  }

  render() {
    return (
      <Button
        style={{ float: "right" }}
        color="danger"
        onClick={e => this.onClick(e)}
      >
        Annuler
      </Button>
    );
  }
}

class Msg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>{this.props.msg}</span>
      </div>
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
      return (
        <Table striped>
          <tbody>
            <tr>
              <th scope="row" />
              <td>
                <Msg msg={msg.title} />
              </td>
              <td>
                <DeleteMsg msg={msg} />
              </td>
            </tr>
          </tbody>
        </Table>
      );
    });

    return (
      <div>
        <div style={sectionStyle} />
        <div
          style={{
            float: "center",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              height: "450px",
              width: "70%",
              marginTop: "100px"
            }}
          />
          <div style={rocketStyle} />

          <div
            style={{
              position: "absolute",
              marginRight: "200px",
              color: "#075EF2",
              fontSize: "40px",
              marginTop: "-70px",
              width: "300px"
            }}
          >
            Contactez Nous
          </div>
        </div>

        <div
          style={{
            marginTop: "-270px"
          }}
          className="row"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            className="col"
          >
            <CreateMsg />
          </div>
        </div>
      </div>
    );
  }
}

export default MsgList;
