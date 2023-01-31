import React, { Component } from "react";
//import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: "",
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    await fetch("/api/values/current")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          values: data,
        })
      })
      .catch((error) => console.log(error));
  }

  async fetchIndexes() {
    await fetch("/api/values/all")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          seenIndexes: data,
        })
      })
      .catch((error) => console.log(error));
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      index: this.state.index,
    };

    await fetch("/api/values", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => console.log(error));

    this.setState({ index: "" });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(",");
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
