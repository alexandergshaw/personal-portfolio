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
  DELAY_BETWEEN_CHARACTERS,
  KEY_PRESS_AUDIO_FILES,
  DATA_STREAMING_AUDIO_FILES,
} from "../../common/constants/bells-and-whistles.constants";
import {
  WELCOME_ASCII_ART,
  SALUTATIONS_3D_ASCII_ART,
  HELLO_HUMAN_3D_ASCII_ART,
  TERMINAL_NAME_3D_ASCII_ART,
} from "../../common/constants/ascii-art.constants";
import "./Home.css";
import testGif from "../../assets/gifs/Animation.gif";
import {
  PROJECTS_DISPLAY_STRINGS,
  LOADING_STRINGS,
} from "../../common/constants/auto-output-text.constants";
import { PROJECTS } from "../../common/constants/projects.constants";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentTextLine: "",
      previousTextLines: [],
      previousCommands: [],
      commandIndex: 0,
      cursorPosition: 0,
      stringBeforeCursor: "",
      stringAfterCursor: "",
      directory: "",
      currentLineMediaSource: ""
    };

    this.audioPlayer = new Audio();

    this.autoOutputText = this.autoOutputText.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCommand = this.handleCommand.bind(this);
    this.goToNextLine = this.goToNextLine.bind(this);
    this.playRandomSound = this.playRandomSound.bind(this);
    this.playSound = this.playSound.bind(this);
    this.autoOutputCharacter = this.autoOutputCharacter.bind(this);

    // this.autoOutputText(LOADING_STRINGS, DELAY_BETWEEN_CHARACTERS);
  }

  autoOutputText(strings, delayBetweenCharacters) {
    const delayBetweenLines = delayBetweenCharacters * 2;
    strings.forEach((string, i) => {
      const stringArray = string.split("");
      const stringLength = strings[i - 1]
        ? strings[i - 1].split("").length
        : stringArray.length;

      setTimeout(() => {
        stringArray.forEach((char, j) => {
          setTimeout(() => {
            this.playRandomSound(DATA_STREAMING_AUDIO_FILES);
            this.autoOutputCharacter(char);
          }, delayBetweenCharacters * j);
        });

        setTimeout(
          () => this.goToNextLine(string),
          delayBetweenCharacters * stringArray.length
        );
      }, (delayBetweenCharacters * stringLength * i) + delayBetweenLines);
    });
  }

  autoOutputCharacter(char) {
    const newStringOnScreen = this.state.currentTextLine + char;
    const newCursorPosition = this.state.cursorPosition + 1;

    this.setState({
      currentTextLine: newStringOnScreen,
      stringBeforeCursor: newStringOnScreen.slice(0, newCursorPosition),
      cursorPosition: newCursorPosition,
    });
  }

  goToNextLine(line) {
    const previousLines = this.state.previousTextLines;
    previousLines.push(line);

    this.setState({
      currentTextLine: "",
      previousTextLines: previousLines,
      cursorPosition: 0,
      stringBeforeCursor: "",
      stringAfterCursor: "",
    });
  }

  handleKeyPress(newInput) {
    this.playRandomSound(KEY_PRESS_AUDIO_FILES);

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
        Object.values(ALL_COMMANDS).map((command) =>
          command.string.toUpperCase()
        )
      );

      if (autocompleteText) {
        const formattedText = autocompleteText.toLowerCase().trim();
        this.setState({
          currentTextLine: formattedText,
          stringBeforeCursor: formattedText,
          cursorPosition: autocompleteText.length,
        });
      }
    } else if (newInput.keyCode === UP_ARROW_KEY_CODE) {
      newInput.preventDefault();
      const newCommandIndex = this.state.previousCommands[
        this.state.commandIndex - 1
      ]
        ? this.state.commandIndex - 1
        : this.state.commandIndex;
      const command = this.state.previousCommands[newCommandIndex]
        ? this.state.previousCommands[newCommandIndex].trim()
        : "";

      this.setState({
        currentTextLine: command,
        stringBeforeCursor: command,
        stringAfterCursor: "",
        commandIndex: newCommandIndex,
        cursorPosition: command.length,
      });
    } else if (newInput.keyCode === DOWN_ARROW_KEY_CODE) {
      newInput.preventDefault();

      const newCommandIndex =
        this.state.commandIndex < this.state.previousCommands.length
          ? this.state.commandIndex + 1
          : this.state.commandIndex;
      const command = this.state.previousCommands[newCommandIndex]
        ? this.state.previousCommands[newCommandIndex].trim()
        : "";

      this.setState({
        currentTextLine: command,
        stringBeforeCursor: command,
        stringAfterCursor: "",
        commandIndex: newCommandIndex,
        cursorPosition: command.length,
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

  playRandomSound(audioFiles) {
    this.playSound(audioFiles[Math.floor(Math.random() * audioFiles.length)]);
  }

  playSound(audioFile) {
    this.audioPlayer.pause();
    this.audioPlayer = new Audio(audioFile);
    const playPromise = this.audioPlayer.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("playback prevented: ", error);
      });
    }
  }

  handleCommand(command) {
    const upperCaseCommand = command.toUpperCase();
    let previousLines = this.state.previousTextLines;

    if (upperCaseCommand === ALL_COMMANDS.HELP.string.toUpperCase()) {
      previousLines.push(DIVIDER);
      previousLines.push(" ");
      previousLines.push("All available commands");

      Object.values(ALL_COMMANDS).map((command) => {
        previousLines.push(command.string + "\t\t" + command.description);
      });

      previousLines.push(" ");
    } else if (
      upperCaseCommand === ALL_COMMANDS.PROJECTS.string.toUpperCase()
    ) {
      // this.autoOutputText(LOADING_STRINGS, DELAY_BETWEEN_CHARACTERS);
      previousLines = [];
      let projectsText = [];

      projectsText.push("Project\t\t\t\tDescription");
      Object.values(PROJECTS).map((project) => {
        projectsText.push(project.displayName + "\t\t[description]");
        
        this.setState({
          currentLineMediaSource: project.gifPath
        });
      });

      this.autoOutputText(projectsText, DELAY_BETWEEN_CHARACTERS);
    } else if (upperCaseCommand === ALL_COMMANDS.ABOUT.string.toUpperCase()) {
      previousLines = [];
      // clear screen and display things a recruiter needs to see
      // include ascii art of myself?
    } else if (upperCaseCommand === ALL_COMMANDS.CLEAR.string.toUpperCase()) {
      previousLines = [];
    } else {
      let mostLikelyCommand = this.determineMostLikely(
        command,
        Object.values(ALL_COMMANDS).map((command) =>
          command.string.toUpperCase()
        )
      );
      let textToOutput = [
        "Unrecognized command. Did you mean " +
          mostLikelyCommand.toLowerCase() +
          "?",
      ];

      this.autoOutputText(textToOutput, DELAY_BETWEEN_CHARACTERS);

      // previousLines.push(DIVIDER);
      // previousLines.push(
      //   "Unrecognized command. Did you mean " +
      //     mostLikelyCommand.toLowerCase() +
      //     "?"
      // );
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
      if (stringBeforeCursor) {
        return stringBeforeCursor;
      }
    };

    const renderStringAfterCursor = () => {
      if (stringAfterCursor) {
        return stringAfterCursor;
      }
    };

    return (
      <main className="Terminal" onKeyDown={this.handleKeyPress} tabIndex={-1}>
        <pre className="TerminalLines">
          {this.state.previousTextLines.map((line) => (
            <div>
              <span className="TerminalText">{line}</span>
            </div>
          ))}
          <div>
            <span className="TerminalText">{LINE_START}</span>
            <span className="TerminalText">{renderStringBeforeCursor()}</span>
            <span className="Cursor">█</span>
            <span className="TerminalText">{renderStringAfterCursor()}</span>
          </div>
        </pre>
      </main>
    );
  }
}

export default Home;
