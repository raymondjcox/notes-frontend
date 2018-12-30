import * as actions from '../actions'

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
    case actions.REQUEST_SAVE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.note.id]: action.note
        },
        saving: true
      };

    case actions.RECEIVE_SAVE_NOTE:
      return {
        ...state,
        saving: false
      };

    case actions.RECEIVE_NOTES:
      return {
        ...state,
        notes: action.notes.reduce((acc, note) => {
          acc[note.id] = note;
          return acc;
        }, {}),
        loading: false
      };

    case actions.RECEIVE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.note.id]: action.note
        },
        loading: false,
        saving: false
      };

    case actions.RECEIVE_DELETE_NOTE:
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
