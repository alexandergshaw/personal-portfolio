import React, { Component } from "react";
import { BACKSPACE_KEY_CODE, LEFT_ARROW_KEY_CODE, RIGHT_ARROW_KEY_CODE } from "../../common/constants/keys.constants";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      input: "",
      cursorPosition: 0,
      stringBeforeCursor: "",
      stringAfterCursor: ""
    };
  }
  handleInput(newInput) {
    console.log('newInput', newInput);
    if (newInput.key.length === 1) {
      const newStringOnScreen = this.state.input + newInput.key;
      const newCursorPosition = this.state.cursorPosition + 1;
      this.setState({
        input: newStringOnScreen,
        stringBeforeCursor: newStringOnScreen.slice(0, newCursorPosition),
        cursorPosition: newCursorPosition
      });
    } else if (newInput.keyCode === BACKSPACE_KEY_CODE) {
      this.setState({
        stringBeforeCursor: this.state.stringBeforeCursor.slice(0, -1),
        cursorPosition: this.state.cursorPosition > 0 ? this.state.cursorPosition - 1 : 0
      });
    } 
    
    else if (newInput.keyCode === LEFT_ARROW_KEY_CODE) {
      const newCursorPosition = this.state.cursorPosition > 0 ? this.state.cursorPosition - 1 : 0;
      const newStringBeforeCursor = this.state.input.slice(0, newCursorPosition);
      const newStringAfterCursor = this.state.input.slice(newCursorPosition);
      console.log('newStringAfterCursor', newStringAfterCursor);

      this.setState({
        stringBeforeCursor: newStringBeforeCursor,
        stringAfterCursor: newStringAfterCursor,
        cursorPosition: newCursorPosition
      });
    } else if (newInput.keyCode === RIGHT_ARROW_KEY_CODE) {
      const newCursorPosition = this.state.cursorPosition < this.state.input.length ? this.state.cursorPosition + 1 : this.state.cursorPosition;
      const newStringBeforeCursor = this.state.stringBeforeCursor.slice(0, newCursorPosition);
      const newStringAfterCursor = this.state.stringAfterCursor.slice(newCursorPosition);


      this.setState({
        stringBeforeCursor: newStringBeforeCursor,
        stringAfterCursor: newStringAfterCursor,
        cursorPosition: newCursorPosition
      });
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
    let {stringBeforeCursor, stringAfterCursor} = this.state;
    console.log('stringBeforeCursor', stringBeforeCursor);
    console.log('stringAfterCursor', stringAfterCursor);

    const renderStringBeforeCursor = () => {
      if (stringBeforeCursor.length) {
          return <span className="Terminal-Text">{this.state.stringBeforeCursor}</span>;
      } 
    }

    const renderStringAfterCursor = () => {
      if (stringAfterCursor.length) {
        return <span className="Terminal-Text">{this.state.stringAfterCursor}</span>;
      }
    }


    return (
      <main className="Terminal" onKeyDown={this.handleInput} tabIndex={-1}>
        <div className="TerminalLines">          
          {renderStringBeforeCursor()}
          <span className="Cursor">|</span>
          {renderStringAfterCursor()}
          <span className="Terminal-Text">{this.state.cursorPosition}</span>
        </div>
      </main>
    );
  }
}

export default Home;
