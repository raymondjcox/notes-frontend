import { connect } from 'react-redux';
import { fetchNotes, createNote } from '../actions';
import { getSortedNotes } from '../selectors';
import ListNotes from '../components/ListNotes';

const mapStateToProps = (state) => {
  let { error, loading } = state;
  return {
    notes: getSortedNotes(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(ListNotes)
