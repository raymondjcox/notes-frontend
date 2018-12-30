import React, { Component } from 'react';
import ListNote from './ListNote';
import styled from 'styled-components';
import FullScreenSpinner from './FullScreenSpinner';
import { connect } from 'react-redux';
import { fetchNotes, createNote } from '../actions';
import moment from 'moment';
import PropTypes from 'prop-types';

const ListWrapper = styled.section`
  display: grid;
  justify-content: center;
  grid-gap: 1em;
`

const HeaderWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr .5fr;
  align-items: center;
  justify-content: center;
  justify-items: center;
  width: 300px;
`

const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    color: var(--light-blue-color);
    font-size: .75em;
    padding: .5em;
    border: 1px solid var(--light-blue-color);
    text-align: center;
    &:hover {
      cursor: pointer;
      border: 1px solid var(--white-color);
      color: var(--white-color);
    }
  `

const Header = styled.header`
  font-size: 4em;
  text-align: center;
`

class IndexPage extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    const { notes, error, loading } = this.props;

    if (error) {
      return <div>Error loading notes!</div>;
    }
    if (loading) {
      return <FullScreenSpinner />;
    }
    let sortedNotes = Object.values(notes)
      .sort((a, b) => moment(a.updated_at).isBefore(moment(b.updated_at)) ? 1 : -1);

    return (
      <div>
        <ListWrapper>
          <HeaderWrapper>
            <Header>Notes</Header>
            <StyledButton onClick={(() => this.props.createNote(this.newNote()))}>Create note</StyledButton>
          </HeaderWrapper>
          {sortedNotes.map(note => <ListNote note={note} key={note.id} />)}
        </ListWrapper>
      </div>
    );
  }

  newNote() {
    return {
      content: '',
      title: moment().format('YYYY-MM-DD')
    }
  }
}

const mapStateToProps = ({ notes: { loading, error, notes } }) => {
  return {
    notes,
    error,
    loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: (note) => dispatch(createNote(note))
  }
};

IndexPage.propTypes = {
  notes: PropTypes.array,
  error: PropTypes.boolean,
  loading: PropTypes.boolean,
  fetchNotes: PropTypes.func,
  createNote: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
