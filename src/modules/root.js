import { combineEpics } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import * as actions from '../actions';

const fetchNotes = action$ => action$.pipe(
  ofType(actions.FETCH_NOTES),
  mergeMap(() =>
    ajax.getJSON('/notes/').pipe(
      map(data => actions.receiveNotes(data.notes))
    )
  )
);

const fetchNote = action$ => action$.pipe(
  ofType(actions.FETCH_NOTE),
  mergeMap(({ noteId }) =>
    ajax.getJSON(`/notes/${noteId}`).pipe(
      map(data => actions.receiveNote(data))
    )
  )
);

export default combineEpics(
  fetchNotes,
  fetchNote
);
