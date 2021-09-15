import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      input: "test",
    };
  }
  handleInput(newInput) {
    console.log('newInput', newInput);
    if (newInput.key.length === 1) {
      this.setState({
        input: this.state.input + newInput.key
      });
    } else if (newInput.keyCode === 8) {
      this.setState({
        input: this.state.input.slice(0, -1)
      })
    }
  }
  // const handleKeyPress = (event) => {
  //   console.log('event', event);
  // };

  // let input = "test";

  // let handleInput = (e) => {
  //   console.log("event", e);
  //   input += e.key;
  //   console.log("input", input);
  // };

  render() {
    return (
      <main className="Terminal" onKeyDown={this.handleInput} tabIndex={-1}>
        <div className="TerminalLines">
          <span className="Terminal-Text">{this.state.input}</span>
          <span className="Cursor">|</span>
        </div>
      </main>
    );
  }
}

export default Home;
