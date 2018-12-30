import { fetchNote, saveNote, deleteNote } from '../actions'
import { connect } from 'react-redux'
import Note from '../components/Note';

const mapStateToProps = ({ notes: { loading, error, notes, saving } }, props) => {
  let { match: { params: { id } } } = props;
  let note = notes[id];

  if (!note) {
    note = {};
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(Note);
