import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListNote extends Component {
  shouldComponentRender(nextProps) {
    return nextProps.note.title !== this.props.note.title;
  }

  render() {
    let { note } = this.props;

    return (
      <Link to={`notes/${note.id}`}>{note.title}</Link>
    )
  }
}

ListNote.propTypes = {
  note: PropTypes.object
};

export default ListNote;
