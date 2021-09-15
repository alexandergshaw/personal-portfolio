import React, { Component } from "react";
import {
  BACKSPACE_KEY_CODE,
  LEFT_ARROW_KEY_CODE,
  RIGHT_ARROW_KEY_CODE,
  SPACE_KEY_CODE,
  ENTER_KEY_CODE,
} from "../../common/constants/keys.constants";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      currentTextLine: "",
      previousTextLines: [],
      cursorPosition: 0,
      stringBeforeCursor: "",
      stringAfterCursor: "",
    };
  }
  handleInput(newInput) {
    // let audio = new Audio('../../assets/sound/keys.mp3');
    // audio.play();

    console.log("newInput", newInput);

    if (newInput.key.length === 1) {
      const newStringOnScreen = this.state.currentTextLine + newInput.key;
      const newCursorPosition = this.state.cursorPosition + 1;

      this.setState({
        currentTextLine: newStringOnScreen,
        stringBeforeCursor: newStringOnScreen.slice(0, newCursorPosition),
        cursorPosition: newCursorPosition,
      });
    } else if (newInput.keyCode === BACKSPACE_KEY_CODE) {
      this.setState({
        stringBeforeCursor: this.state.stringBeforeCursor.slice(0, -1),
        cursorPosition:
          this.state.cursorPosition > 0 ? this.state.cursorPosition - 1 : 0,
      });
    } else if (newInput.keyCode === ENTER_KEY_CODE) {
      let previousLine = this.state.previousTextLines;
      previousLine.push(this.state.currentTextLine);

      this.setState({
        currentTextLine: "",
        stringBeforeCursor: "",
        stringAfterCursor: "",
        cursorPosition: 0,
        previousTextLines: previousLine,
      });
    } else if (newInput.keyCode === LEFT_ARROW_KEY_CODE) {
      const newCursorPosition =
        this.state.cursorPosition > 0 ? this.state.cursorPosition - 1 : 0;
      const newStringBeforeCursor = this.state.currentTextLine.slice(
        0,
        newCursorPosition
      );
      const newStringAfterCursor =
        this.state.currentTextLine.slice(newCursorPosition);

      this.setState({
        stringBeforeCursor: newStringBeforeCursor,
        stringAfterCursor: newStringAfterCursor,
        cursorPosition: newCursorPosition,
      });
    } else if (newInput.keyCode === RIGHT_ARROW_KEY_CODE) {
      const newCursorPosition =
        this.state.cursorPosition < this.state.currentTextLine.length
          ? this.state.cursorPosition + 1
          : this.state.cursorPosition;
      const newStringBeforeCursor = this.state.currentTextLine.slice(
        0,
        newCursorPosition
      );
      const newStringAfterCursor =
        this.state.currentTextLine.slice(newCursorPosition);

      this.setState({
        stringBeforeCursor: newStringBeforeCursor,
        stringAfterCursor: newStringAfterCursor,
        cursorPosition: newCursorPosition,
      });
    } else if (newInput.keyCode === SPACE_KEY_CODE) {
      const newCursorPosition = this.state.cursorPosition + 1;
      const newStringBeforeCursor = this.state.stringBeforeCursor + " ";
      const newStringOnScreen =
        this.state.stringBeforeCursor + " " + this.state.stringAfterCursor;

      console.log("newStringBeforeCursor", newStringBeforeCursor);

      this.setState({
        currentTextLine: newStringOnScreen,
        stringBeforeCursor: newStringBeforeCursor,
        cursorPosition: newCursorPosition,
      });
    }
  }
  // const handleKeyPress = (event) => {
  //   console.log('event', event);
  // };

  // let currentTextLine = "test";

  // let handleInput = (e) => {
  //   console.log("event", e);
  //   currentTextLine += e.key;
  //   console.log("currentTextLine", currentTextLine);
  // };

  render() {
    let { stringBeforeCursor, stringAfterCursor } = this.state;

    const renderStringBeforeCursor = () => {
      if (stringBeforeCursor.length) {
        return this.state.stringBeforeCursor;
      }
    };

    const renderStringAfterCursor = () => {
      if (stringAfterCursor.length) {
        return this.state.stringAfterCursor;
      }
    };

    return (
      <main className="Terminal" onKeyDown={this.handleInput} tabIndex={-1}>
        <div className="TerminalLines">
          {this.state.previousTextLines.map((line) => (
            <div>
              <span className="Terminal-Text">{line}</span>
            </div>
          ))}
          <div>
            <span className="Terminal-Text">{renderStringBeforeCursor()}</span>
            <span className="Cursor">|</span>
            <span className="Terminal-Text">{renderStringAfterCursor()}</span>
          </div>
          <span className="Terminal-Text">{this.state.cursorPosition}</span>
        </div>
      </main>
    );
  }
}

export default Home;
