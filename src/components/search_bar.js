/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

// window.counter = 1;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchterm: ' ' };
  }

  addNote = () => {
    // window.counter += 1;
    const xpos = 75;
    const ypos = 100;
    this.props.onSearchChange(this.state.searchterm, xpos, ypos);
    this.state.searchterm = '';
  }

  changeSearch = (event) => {
    this.setState({ searchterm: event.target.value });
  }

  render() {
    return (
      <div className="search">
        <input onChange={this.changeSearch} value={this.state.searchterm} placeholder="new title name.." />
        <button onClick={this.addNote} type="submit">CREATE</button>
      </div>
    );
  }
}

export default SearchBar;
