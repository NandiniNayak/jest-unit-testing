import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  // componentWillMount() {
  //   this.setState({
  //     counter: 1
  //   });
  // }
  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">Hey click me {this.state.counter}</h1>
        <button
          data-test="increment-button"
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          Click me
        </button>
      </div>
    );
  }
}

export default App;
