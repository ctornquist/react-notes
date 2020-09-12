/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

// window.counter = 1;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchterm: ' ' };
  }

  addNote = () => {
    // window.counter += 1;
    console.log(this.state);
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
        <input type="email" className="form-control" onChange={this.changeSearch} value={this.state.searchterm} placeholder="new title name" />
        <Button onClick={this.addNote} variant="primary">CREATE</Button>
        {/* <button onClick={this.addNote} type="submit">CREATE</button>
        <input value={this.state.searchterm} placeholder="new name.." /> */}
      </div>
    );
  }
}

export default SearchBar;
