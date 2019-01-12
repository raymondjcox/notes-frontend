import { ajax } from 'rxjs/ajax';


export const deleteNote = (note) => ajax.delete(`/notes/${note.id}`);
export const saveNote = (note) => ajax.patch(`/notes/${note.id}`, note, { 'Content-Type': 'application/json'});
export const getNotes = () => ajax.getJSON('/notes/');
export const getNote = (id) => ajax.getJSON(`/notes/${id}`);
export const createNote = (note) => ajax.post(`/notes/create`, note, { 'Content-Type': 'application/json'});
