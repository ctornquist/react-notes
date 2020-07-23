/* eslint-disable lines-between-class-members */
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Immutable from 'immutable';
import './style.scss';
import SearchBar from './components/search_bar';
import Note from './components/note';
import * as db from './datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: null,
    };
  }

  // runs right after the constructor
  componentDidMount = () => {
    db.fetchNotes((notes) => {
      this.setState({ notes: new Immutable.Map(notes) });
    });
  }

  // callback function to add to map
  createNote = (newTitle, newX, newY) => {
    const object = {
      title: newTitle,
      text: ' ',
      x: newX,
      y: newY,
    };

    /* this.setState((prevState) => ({
      notes: prevState.notes.set(i, object),
    })); */

    db.addNote(object);
  }

  // callback function to delete from map
  deleteNote = (id) => {
    /* this.setState((prevState) => ({
      notes: prevState.notes.delete(id),
    })); */

    db.deleteNote(id);
  }

  updateNote = (id, fields) => {
    /* const fields = {
      title: newTitle,
      x: newX,
      y: newY,
      text: newText,
    };

    this.setState((prevState) => ({
      notes: prevState.notes.update(i, (n) => {
        // eslint-disable-next-line prefer-object-spread
        return (Object.assign({}, n, newNote));
      }),
    })); */

    db.updateNote(id, fields);
  }

  getNote = (newNotes) => {
    this.setState({
      // eslint-disable-next-line new-cap
      notes: new Map(newNotes),
    });
  }

  render() {
    // if notes isn't undefined, render each note in the map
    const renderNotes = this.state.notes !== null ? this.state.notes.entrySeq().map(([id, note]) => {
      return <li><Note onUpdate={this.updateNote} onDelete={this.deleteNote} key={id} id={id} note={note} /></li>;
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
