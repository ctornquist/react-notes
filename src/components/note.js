/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  // deleting note
  removeNote = () => {
    this.props.onDelete(this.props.id);
  }

  handleDrag = (e, data) => {
    const fields = {
      title: this.props.note.title,
      text: this.props.note.text,
      x: data.x,
      y: data.y,
      zIndex: this.props.note.zIndex,
    };

    this.props.onUpdate(this.props.id, fields);
  };

  handleStartDrag = (e, data) => {
    const fields = {
      title: this.props.note.title,
      text: this.props.note.text,
      x: data.x,
      y: data.y,
      zIndex: this.props.maxZ + 1,
    };

    this.props.onUpdate(this.props.id, fields);
    this.props.incZ();
  }

  // next couple are for editing button
  startEdit = () => {
    this.setState((prevState) => ({
      isEditing: true,
    }));
  }

  doneEdit = () => {
    this.setState((prevState) => ({
      isEditing: false,
    }));
  }

  changeTitle = (event) => {
    // this.props.onUpdate(event.target.value, this.props.note.text, this.props.note.x, this.props.note.y, this.props.id);

    const fields = {
      title: event.target.value,
      text: this.props.note.text,
      x: this.props.note.x,
      y: this.props.note.y,
      zIndex: this.props.note.zIndex,
    };

    this.props.onUpdate(this.props.id, fields);
  }

  changeContent = (event) => {
    // this.props.onUpdate(this.props.note.title, event.target.value, this.props.note.x, this.props.note.y, this.props.id);

    const fields = {
      title: this.props.note.title,
      text: event.target.value,
      x: this.props.note.x,
      y: this.props.note.y,
      zIndex: this.props.note.zIndex,
    };

    this.props.onUpdate(this.props.id, fields);
  }

  renderTopBar = () => {
    if (this.state.isEditing) {
      return (
        <div className="topBar">
          <TextareaAutosize input id="inputTitle" onChange={this.changeTitle} value={this.props.note.title} />
          <div className="editors">
            <button onClick={this.removeNote} type="submit"> <i className="fas fa-trash-alt" id="edit" /> </button>
            <button onClick={this.doneEdit} type="submit"> <i className="far fa-check-square" /> </button>
            <i className="fas fa-expand-arrows-alt" id="dragger" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="topBar">
          <h3 id="title">{this.props.note.title}</h3>
          <div className="editors">
            <button onClick={this.removeNote} type="submit"> <i className="fas fa-trash-alt" id="edit" /> </button>
            <button onClick={this.startEdit} type="submit"> <i className="fas fa-edit" id="edit" /> </button>
            <i className="fas fa-expand-arrows-alt" id="dragger" />
          </div>
        </div>
      );
    }
  }

  renderContent = () => {
    if (this.state.isEditing) {
      return (
        <div className="content">
          <TextareaAutosize input id="inputContent" onChange={this.changeContent} value={this.props.note.text} />
        </div>
      );
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".fa-expand-arrows-alt"
        grid={[1, 1]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{
          x: this.props.note.x, y: this.props.note.y,
        }}
        onDrag={this.handleDrag}
        onStart={this.handleStartDrag}
      >
        <div className="item" style={{ zIndex: this.props.note.zIndex }}>
          {this.renderTopBar()}
          {this.renderContent()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
