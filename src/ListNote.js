import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListNote extends Component {
  render() {
    let { note } = this.props;

    return (
      <Link to={`notes/${note.id}`}>{note.title}</Link>
    )
  }
}

export default ListNote;
