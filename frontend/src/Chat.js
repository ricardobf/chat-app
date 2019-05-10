import "react-chat-elements/dist/main.css";

import React, { Component } from "react";
import { MessageList, Input, Button } from "react-chat-elements";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.ws = new WebSocket(`${process.env.REACT_APP_BACKEND_WS}/ws`);
    this.user = props.auth.user;
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/messages`)
      .then(response => response.json())
      .then(messages => messages.map(message => this.formatMessage(message)))
      .then(messages => messages.reverse())
      .then(messages => this.setState({ messages }))
      .then(() => {
        this.refs.input.input.focus();
        this.ws.onmessage = frame => {
          const { messages } = this.state;

          const newMessages = this.parseWebsocketFrame(frame);

          this.setState({ messages: [...messages, ...newMessages] });
        };
      });
  }

  sendMessage() {
    const value = this.refs.input.state.value;
    if (value && value.trim()) {
      this.ws.send(
        JSON.stringify({
          text: value.trim(),
          uid: this.props.auth.user.id,
          date: new Date(),
          title: this.props.auth.user.name
        })
      );
      this.refs.input.clear();
    }
  }

  parseWebsocketFrame(frame) {
    const data = frame.data.split("\n");
    return data.map(json => this.formatMessage(JSON.parse(json)));
  }

  formatMessage({ text, uid, date, title }) {
    return {
      position: uid === this.props.auth.user.id ? "right" : "left",
      type: "text",
      text,
      date: new Date(date),
      title
    };
  }

  render() {
    return (
      <div>
        <button className="logout" onClick={() => this.props.auth.logout()}>
          Logout
        </button>
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={this.state.messages}
        />
        <Input
          ref="input"
          placeholder="Type here..."
          multiline={false}
          onKeyPress={({ key }) => key === "Enter" && this.sendMessage()}
          rightButtons={
            <Button
              color="white"
              backgroundColor="black"
              text="Send"
              onClick={() => this.sendMessage()}
            />
          }
        />
      </div>
    );
  }
}

export default Chat;
