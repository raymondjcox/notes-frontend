import { RECEIVE_NOTES, RECEIVE_NOTE, REQUEST_SAVE_NOTE, RECEIVE_SAVE_NOTE, RECEIVE_DELETE_NOTE } from '../actions'

export default (state, action) => {
  if (state === undefined) {
    return {
      loading: true,
      saving: false,
      error: false,
      notes: {}
    };
  }

  switch (action.type) {
    case REQUEST_SAVE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.note.id]: action.note
        },
        saving: true
      };

    case RECEIVE_SAVE_NOTE:
      return {
        ...state,
        saving: false
      };

    case RECEIVE_NOTES:
      let notes = action.notes.reduce((acc, note) => {
        acc[note.id] = note;
        return acc;
      }, {});

      return {
        ...state,
        notes,
        loading: false
      };

    case RECEIVE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.note.id]: action.note
        },
        loading: false,
        saving: false
      };

    case RECEIVE_DELETE_NOTE:
      return {
        ...state,
        notes: {
          ...Object.keys(state.notes).reduce((acc, note) => {
            if (note.id !== action.note.id) {
              acc[note.id] = note;
            }
            return acc;
          }, {})
        }
      };
    default:
      return state;
  }
}
