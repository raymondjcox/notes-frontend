import { push, replace } from 'connected-react-router'
import debounce from 'lodash/debounce';

export const REQUEST_NOTES = 'REQUEST_NOTES';
function requestNotes() {
  return {
    type: REQUEST_NOTES
  }
}

export const REQUEST_NOTE = 'REQUEST_NOTE';
function requestNote() {
  return {
    type: REQUEST_NOTE
  }
}

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
function receiveNotes(notes) {
  return {
    type: RECEIVE_NOTES,
    notes,
    receivedAt: Date.now()
  }
}

export const RECEIVE_NOTE = 'RECEIVE_NOTE';
function receiveNote(note) {
  return {
    type: RECEIVE_NOTE,
    note,
    receivedAt: Date.now()
  }
}

export const REQUEST_CREATE_NOTE = 'REQUEST_CREATE_NOTE';
function requestCreateNote() {
  return {
    type: REQUEST_CREATE_NOTE
  }
}

export const REQUEST_SAVE_NOTE = 'REQUEST_SAVE_NOTE';
function requestSaveNote(note) {
  return {
    type: REQUEST_SAVE_NOTE,
    note
  }
}

export const RECEIVE_SAVE_NOTE = 'RECEIVE_SAVE_NOTE';
function receiveSaveNote(note) {
  return {
    type: RECEIVE_SAVE_NOTE,
    note
  }
}

export const RECEIVE_DELETE_NOTE = 'RECEIVE_DELETE_NOTE';
function receiveDeleteNote(note) {
  return {
    type: RECEIVE_DELETE_NOTE,
    note
  }
}

export function fetchNotes() {
  return (dispatch) => {
    dispatch(requestNotes());
    fetch('/notes/')
      .then(res => res.json())
      .then(json => dispatch(receiveNotes(json.notes)))
  }
}

export function fetchNote(noteId) {
  return (dispatch) => {
    dispatch(requestNote());
    fetch(`/notes/${noteId}`)
      .then(res => res.json())
      .then(json => dispatch(receiveNote(json)))
  }
}

export function createNote(note) {
  return (dispatch) => {
    dispatch(requestCreateNote());
    fetch(`/notes/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }).then(res => res.json())
      .then((note) => dispatch(push(`/notes/${note.id}`)))
  };
}

const debouncedSaveNote = debounce((note, dispatch) => {
  fetch(`/notes/${note.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  }).finally(() => dispatch(receiveSaveNote(note)))
}, 500, { 'leading': true });

export function saveNote(note) {
  return (dispatch) => {
    dispatch(requestSaveNote(note));
    debouncedSaveNote(note, dispatch);
  };
}

export function deleteNote(note) {
  return (dispatch) => {
    fetch(`/notes/${note.id}`, {
      method: 'DELETE'
    }).then(() => {
      dispatch(replace('/'));
      dispatch(receiveDeleteNote(note));
    });
  }
}
