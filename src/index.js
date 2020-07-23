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
      notes: null,
      maxZ: 0,
    };
  }

  // runs right after the constructor
  componentDidMount = () => {
    db.fetchNotes(this.getNote);

    // this.setState({ notes: new Immutable.Map() });
  }

  getNote = (newNotes) => {
    let newMax = 0;
    // eslint-disable-next-line eqeqeq
    if (newNotes != undefined) {
      Object.keys(newNotes).forEach((key) => {
        if (newNotes[key].zIndex > newMax) {
          newMax = newNotes[key].zIndex;
        }
      });
    }

    // eslint-disable-next-line new-cap
    this.setState({ notes: Map(newNotes), maxZ: newMax + 1 });

    /* this.setState({
      // eslint-disable-next-line new-cap
      notes: new Map(newNotes),
    }); */
  }

  // callback function to add to map
  createNote = (newTitle, newX, newY) => {
    const object = {
      title: newTitle,
      text: ' ',
      x: newX,
      y: newY,
      zIndex: 0,
    };

    db.addNote(object);

    /* this.setState((prevState) => ({
      notes: prevState.notes.set(i, object),
    })); */
  }

  // callback function to delete from map
  deleteNote = (id) => {
    /* this.setState((prevState) => ({
      notes: prevState.notes.delete(id),
    })); */

    console.log('deleting note');
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

  increaseZ = () => {
    this.setState((prevstate) => ({
      maxZ: prevstate.maxZ + 1,
    }));
  }

  render() {
    // if notes isn't undefined, render each note in the map
    const renderNotes = this.state.notes !== null ? this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <li key={id}> <Note
          onUpdate={this.updateNote}
          onDelete={this.deleteNote}
          incZ={this.increaseZ}
          key={id}
          id={id}
          note={note}
          maxZ={this.state.maxZ}
        />
        </li>
      );
    }) : null;

    return (
      <div>
        <SearchBar onSearchChange={this.createNote} id="search-bar" />
        <ul> {renderNotes} </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
