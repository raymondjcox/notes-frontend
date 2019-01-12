export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const receiveNotes = (notes) => ({ type: RECEIVE_NOTES, notes, receivedAt: Date.now() });

export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const receiveNote = (note) => ({ type: RECEIVE_NOTE, note, receivedAt: Date.now() });

export const RECEIVE_SAVE_NOTE = 'RECEIVE_SAVE_NOTE';
export const receiveSaveNote = (note) => ({ type: RECEIVE_SAVE_NOTE, note });

export const RECEIVE_DELETE_NOTE = 'RECEIVE_DELETE_NOTE';
export const receiveDeleteNote = (note) => ({ type: RECEIVE_DELETE_NOTE, note });

export const FETCH_NOTES = 'FETCH_NOTES';
export const fetchNotes = () => ({ type: FETCH_NOTES });

export const FETCH_NOTE = 'FETCH_NOTE';
export const fetchNote = (noteId) => ({ type: FETCH_NOTE, noteId });

export const CREATE_NOTE = 'CREATE_NOTE';
export const createNote = (note) => ({ type: CREATE_NOTE, note });

export const SAVE_NOTE = 'SAVE_NOTE';
export const saveNote = (note) => ({ type: SAVE_NOTE, note });

export const DELETE_NOTE = 'DELETE_NOTE';
export const deleteNote = (note) => ({ type: DELETE_NOTE, note });
