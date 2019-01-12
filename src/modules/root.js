import { combineEpics } from 'redux-observable';
import { mergeMap, map, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { push, replace } from 'connected-react-router'
import * as actions from '../actions';
import * as api from './api';

const fetchNotes = action$ => action$.pipe(
  ofType(actions.FETCH_NOTES),
  mergeMap(() =>
    api.getNotes().pipe(
      map(data => actions.receiveNotes(data.notes))
    )
  )
);

const fetchNote = action$ => action$.pipe(
  ofType(actions.FETCH_NOTE),
  mergeMap(({ noteId }) =>
    api.getNote(noteId).pipe(
      map(data => actions.receiveNote(data))
    )
  )
);

const createNote = action$ => action$.pipe(
  ofType(actions.CREATE_NOTE),
  mergeMap(({ note }) =>
    api.createNote(note).pipe(
      map(note => actions.receiveNote(note.response)),
      map(({ note }) => push(`/notes/${note.id}`))
    )
  )
);

const deleteNote = action$ => action$.pipe(
  ofType(actions.DELETE_NOTE),
  mergeMap(({ note }) =>
    api.deleteNote(note).pipe(
      map(note => actions.receiveDeleteNote(note)),
      map(() => replace('/'))
    )
  )
);


const saveNote = action$ => action$.pipe(
  ofType(actions.SAVE_NOTE),
  debounceTime(500),
  mergeMap(({ note }) =>
    api.saveNote(note).pipe(map(note => actions.receiveSaveNote(note)))
  )
);

export default combineEpics(
  fetchNotes,
  fetchNote,
  createNote,
  deleteNote,
  saveNote
);
