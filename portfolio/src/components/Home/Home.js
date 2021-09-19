import React, { Component } from "react";
import {
  BACKSPACE_KEY_CODE,
  LEFT_ARROW_KEY_CODE,
  RIGHT_ARROW_KEY_CODE,
  SPACE_KEY_CODE,
  ENTER_KEY_CODE,
  TAB_KEY_CODE,
  DELETE_KEY_CODE,
  UP_ARROW_KEY_CODE,
  DOWN_ARROW_KEY_CODE,
} from "../../common/constants/keys.constants";
import { ALL_COMMANDS } from "../../common/constants/commands.constants";
import {
  DIVIDER,
  LINE_START,
} from "../../common/constants/bells-and-whistles.constants";
import {
  WELCOME_ASCII_ART,
  SALUTATIONS_3D_ASCII_ART,
  HELLO_HUMAN_3D_ASCII_ART,
  TERMINAL_NAME_3D_ASCII_ART,
} from "../../common/constants/ascii-art.constants";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.welcome = this.welcome.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCommand = this.handleCommand.bind(this);
    this.goToNextLine = this.goToNextLine.bind(this);

    this.state = {
      currentTextLine: "",
      previousTextLines: [],
      previousCommands: [],
      commandIndex: 0,
      cursorPosition: 0,
      stringBeforeCursor: "",
      stringAfterCursor: "",
    };
    // this.welcome();
  }

  welcome() {
    console.log("in welcome()");
    WELCOME_ASCII_ART.forEach((line) => {
      console.log("------------NEW LINE--------------");
      line.split("").forEach((character) => {
        console.log("------------NEW CHAR--------------");
        console.log("character", character);
        const input = {
          key: character,
          keyCode: " ",
        };
        this.handleInput(input);
      });
      this.goToNextLine(line);
    });
  }

  goToNextLine(line) {
    console.log("in goToNextLine");
    const previousLines = this.state.previousTextLines;
    previousLines.push(line);

    console.log("previousLines", previousLines);

    this.setState({
      currentTextLine: "",
      previousTextLines: previousLines,
      cursorPosition: 0,
      stringBeforeCursor: "",
      stringAfterCursor: "",
    });
  }

  handleInput(newInput) {
    // let audio = new Audio('../../assets/sound/keys.mp3');
    // audio.play();

    console.log("commandIndex", this.state.commandIndex);
    console.log("previousCommands", this.state.previousCommands);

    if (newInput.key.length === 1 && newInput.keyCode !== SPACE_KEY_CODE) {
      const newStringOnScreen = this.state.currentTextLine + newInput.key;
      const newCursorPosition = this.state.cursorPosition + 1;

      this.setState({
        currentTextLine: newStringOnScreen,
        stringBeforeCursor: newStringOnScreen.slice(0, newCursorPosition),
        cursorPosition: newCursorPosition,
      });
    } else if (newInput.keyCode === BACKSPACE_KEY_CODE) {
      const newStringBeforeCursor = this.state.stringBeforeCursor.slice(0, -1);
      this.setState({
        stringBeforeCursor: newStringBeforeCursor,
        currentTextLine: newStringBeforeCursor + this.state.stringAfterCursor,
        cursorPosition:
          this.state.cursorPosition > 0 ? this.state.cursorPosition - 1 : 0,
      });
    } else if (newInput.keyCode === DELETE_KEY_CODE) {
      const newStringAfterCursor = this.state.stringAfterCursor.slice(
        this.state.cursorPosition + 1
      );
      this.setState({
        stringAfterCursor: newStringAfterCursor,
        currentTextLine: this.state.stringBeforeCursor + newStringAfterCursor,
      });
    } else if (newInput.keyCode === ENTER_KEY_CODE) {
      let previousLines = this.state.previousTextLines;
      let priorLine =
        this.state.currentTextLine.slice(0, this.state.cursorPosition) +
        " " +
        this.state.currentTextLine.slice(this.state.cursorPosition);
      previousLines.push(LINE_START + priorLine);

      let previousCommands = this.state.previousCommands;
      previousCommands.push(priorLine);

      this.setState({
        currentTextLine: "",
        stringBeforeCursor: "",
        stringAfterCursor: "",
        cursorPosition: 0,
        previousTextLines: this.handleCommand(this.state.currentTextLine),
        previousCommands: previousCommands,
        commandIndex: this.state.previousCommands.length,
      });

    } else if (newInput.keyCode === TAB_KEY_CODE) {
      newInput.preventDefault();
      const autocompleteText = this.autocomplete(
        this.state.currentTextLine,
        Object.values(ALL_COMMANDS).map((command) => command.toUpperCase())
      );

      if (autocompleteText) {
        this.setState({
          currentTextLine: autocompleteText.toLowerCase(),
          stringBeforeCursor: autocompleteText.toLowerCase(),
          cursorPosition: autocompleteText.length
        });
      }
    } else if (newInput.keyCode === UP_ARROW_KEY_CODE) {
      newInput.preventDefault();
      const newCommandIndex = this.state.previousCommands[this.state.commandIndex - 1] ? this.state.commandIndex - 1 : this.state.commandIndex;
      const command = this.state.previousCommands[newCommandIndex];

      this.setState({
        currentTextLine: command,
        stringBeforeCursor: command,
        stringAfterCursor: "",
        commandIndex: newCommandIndex,
        cursorPosition: command.length
      });
    } else if (newInput.keyCode === DOWN_ARROW_KEY_CODE) {
      newInput.preventDefault();
      
      const newCommandIndex = this.state.commandIndex < this.state.previousCommands.length ? this.state.commandIndex + 1 : this.state.commandIndex;
      const command = this.state.previousCommands[newCommandIndex] ? this.state.previousCommands[newCommandIndex] : "";

      this.setState({
        currentTextLine: command,
        stringBeforeCursor: command,
        stringAfterCursor: "",
        commandIndex: newCommandIndex,
        cursorPosition: command.length
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
        this.state.stringBeforeCursor + this.state.stringAfterCursor;

      this.setState({
        currentTextLine: newStringOnScreen,
        stringBeforeCursor: newStringBeforeCursor,
        cursorPosition: newCursorPosition,
      });
    }

    //
  }

  handleCommand(command) {
    const upperCaseCommand = command.toUpperCase();
    let previousLines = this.state.previousTextLines;

    if (upperCaseCommand === ALL_COMMANDS.HELP.toUpperCase()) {
      previousLines.push(DIVIDER);
      previousLines.push("All available commands");
      previousLines.push("projects - display all projects");
      previousLines.push("about - display info about the developer");
      previousLines.push("help - display all commands");
    } else if (upperCaseCommand === ALL_COMMANDS.PROJECTS.toUpperCase()) {
      previousLines = [];
      // clear screen and display projects
    } else if (upperCaseCommand === ALL_COMMANDS.ABOUT.toUpperCase()) {
      previousLines = [];
      // clear screen and display things a recruiter needs to see
      // include ascii art of myself?
    } else {
      let mostLikelyCommand = this.determineMostLikely(
        command,
        Object.values(ALL_COMMANDS).map((command) => command.toUpperCase())
      );
      previousLines.push(DIVIDER);
      previousLines.push(
        "Unrecognized command. Did you mean " +
          mostLikelyCommand.toLowerCase() +
          "?"
      );
    }

    return previousLines;
  }

  determineMostLikely(input, availableOptions) {
    let stringSimilarity = require("string-similarity");
    return stringSimilarity.findBestMatch(input.toUpperCase(), availableOptions)
      .bestMatch.target;
  }

  autocomplete(input, availableOptions) {
    const upperCaseInput = input.toUpperCase();
    let possibilities = [];
    availableOptions.forEach((option) => {
      const upperCaseOption = option.toUpperCase();
      if (upperCaseOption.includes(upperCaseInput)) {
        possibilities.push(option);
      }
    });

    if (possibilities.length > 1) {
      return this.determineMostLikely(input, possibilities);
    } else if (possibilities.length) {
      return possibilities[0];
    } else {
      return "";
    }
  }

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
        <pre className="TerminalLines">
          {this.state.previousTextLines.map((line) => (
            <div>
              <span className="Terminal-Text">{line}</span>
            </div>
          ))}
          <div>
            <span className="Terminal-Text">{LINE_START}</span>
            <span className="Terminal-Text">{renderStringBeforeCursor()}</span>
            <span className="Cursor">█</span>
            <span className="Terminal-Text">{renderStringAfterCursor()}</span>
          </div>
        </pre>
      </main>
    );
  }
}

export default Home;
