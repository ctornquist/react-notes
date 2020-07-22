/* eslint-disable lines-between-class-members */
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Map } from 'immutable';
import './style.scss';
import SearchBar from './components/search_bar';
import Note from './components/note';
import * as db from './datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: new Map(),
    };
  }

  // callback function to add to map
  createNote = (newTitle, newX, newY, i) => {
    const object = {
      title: newTitle,
      x: newX,
      y: newY,
      id: i,
    };

    this.setState((prevState) => ({
      notes: prevState.notes.set(i, object),
    }));
  }

  // callback function to delete from map
  deleteNote = (id) => {
    this.setState((prevState) => ({
      notes: prevState.notes.delete(id),
    }));
  }

  updateNote = (newTitle, newText, newX, newY, i) => {
    const newNote = {
      title: newTitle,
      x: newX,
      y: newY,
      text: newText,
      id: i,
    };

    // from Tim's notes
    this.setState((prevState) => ({
      notes: prevState.notes.update(i, (n) => {
        // eslint-disable-next-line prefer-object-spread
        return (Object.assign({}, n, newNote));
      }),
    }));
  }

  render() {
    // if notes isn't undefined, render each note in the map
    const renderNotes = this.state.notes !== undefined ? this.state.notes.entrySeq().map(([id, note]) => {
      return <li><Note onUpdate={this.updateNote} onDelete={this.deleteNote} key={id} note={note} /></li>;
    }) : null;

    console.log(this.state.notes);

    return (
      <div>
        <SearchBar onSearchChange={this.createNote} id="search-bar" />
        <ul> {renderNotes} </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
