import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import FullScreenSpinner from './FullScreenSpinner';
import NotePageHeader from './NotePageHeader';
import { fetchNote, saveNote, deleteNote } from './actions'
import { connect } from 'react-redux'

const NoteWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 35px);
  margin-top: 35px;
  position: relative;
  &.editor-hidden {
    grid-template-columns: 1fr;
  }
`;

const MarkdownWrapper = styled.section`
  padding-left: 1em;
`;

const EditorWrapper = styled.section`
  &.editor-hidden {
    display: none;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  overflow: scroll;
`;

const SavingToast = styled.div`
  position: fixed;
  bottom: 0px;
  left: 46%;
  background-color: black;
  color: var(--white-color);
  padding: 10px 20px;
  opacity: .5;
  transition: opacity .1s;
  &.hidden {
    opacity: 0;
  }
`;

const Editor = styled.textarea`
  resize: none;
  color: var(--white-color);
  font-size: 1em;
  margin: 0px;
  border-height: 0px;
  height: 100%;
  width: 100%;
  background-color: var(--dark-blue-color);
  padding: .5em;
  border: none;
  border-right: 1px solid var(--blue-color);
  outline: none;
`;

class NotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
      deleted: false
    };

    this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
    this.handleUpdateContent = this.handleUpdateContent.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.fetchNote(id);
  }

  handleUpdateContent(event) {
    const { note } = this.props;
    let updatedNote = { ...note, content: event.target.value };
    this.props.saveNote(updatedNote);
  }

  handleUpdateTitle(event) {
    const { note } = this.props;
    let updatedNote = { ...note, title: event.target.value };
    this.props.saveNote(updatedNote);
  }

  render() {
    const { showEditor } = this.state;
    const { loading, saving, note, error } = this.props;
    const savingClass = saving ? '' : 'hidden';
    const editorHidden = showEditor ? '' : 'editor-hidden';

    if (loading) {
      return <FullScreenSpinner />;
    }
    if (error) {
      return <div>Error loading note!</div>;
    }
    return (
      <Wrapper>
        <NotePageHeader
          title={note.title}
          showEditor={showEditor}
          updateTitle={this.handleUpdateTitle}
          clickDelete={(() => this.props.deleteNote(note)) }
          clickEdit={(() => this.setState({showEditor: !showEditor}))} />
        <NoteWrapper className={`${editorHidden}`}>
          <EditorWrapper className={`${editorHidden}`}>
            <Editor value={note.content} onChange={this.handleUpdateContent}/>
          </EditorWrapper>
          <MarkdownWrapper>
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </MarkdownWrapper>
        </NoteWrapper>
        <SavingToast className={`${savingClass}`}>Saving...</SavingToast>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ notes: { loading, error, notes, saving } }, props) => {
  let { match: { params: { id } } } = props;
  let note = notes[id];
  note ? loading = false : note = {};

  return {
    note,
    error,
    loading,
    saving
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNote: (id) => dispatch(fetchNote(id)),
    saveNote: (note) => dispatch(saveNote(note)),
    deleteNote: (note) => dispatch(deleteNote(note))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
