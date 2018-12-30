import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleWrapper = styled.section`
  display: grid;
  position: fixed;
  width: 100%;
  background-color: var(--black-color);
  grid-template-columns: auto 1fr;
  z-index: 1;
  border-bottom: 1px solid var(--blue-color);
`;

const ButtonWrapper = styled.section`
  display: flex;
`;

const ToggleButton = styled.button`
  border: none;
  color: var(--light-blue-color);
  font-size: .75em;
  padding: .5em;
  border-right: 1px solid var(--blue-color);
  text-align: center;
  background-color: transparent;
  outline: none;
  &:hover {
    cursor: pointer;
    color: var(--white-color);
  }
`;

const DeleteButton = styled.button`
  border: none;
  color: var(--red-color);
  font-size: .75em;
  padding: .5em;
  border-right: 1px solid var(--blue-color);
  text-align: center;
  background-color: transparent;
  outline: none;
  &:hover {
    cursor: pointer;
    color: var(--white-color);
  }
  &.hidden {
    display: none;
  }
`;

const Title = styled.input`
  width: 100%;
  background-color: transparent;
  color: var(--white-color);
  padding: .5em;
  font-size: 1em;
  border: none;
  outline: none;
  text-align: center;
`;

class NoteHeader extends Component {
  render() {
    const { title, showEditor, clickEdit, clickDelete, updateTitle } = this.props;
    return (
      <TitleWrapper>
        <ButtonWrapper>
          <ToggleButton onClick={clickEdit}>{showEditor ? 'Hide Editor' : 'Edit'}</ToggleButton>
          <DeleteButton onClick={clickDelete} className={showEditor ? '' : 'hidden'}>Delete</DeleteButton>
        </ButtonWrapper>
        <Title value={title} onChange={updateTitle} />
      </TitleWrapper>
    );
  }
}

NoteHeader.propTypes = {
  title: PropTypes.string,
  showEditor: PropTypes.bool,
  clickEdit: PropTypes.func,
  clickDelete: PropTypes.func,
  updateTitle: PropTypes.func
}

export default NoteHeader;
