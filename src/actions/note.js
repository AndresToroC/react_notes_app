import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { types } from '../types/type';

// Load notes
export const loadNotes = (uid) => {
    return async(dispatch) => {
        const notes = [];

        const noteSnap = await db.collection(`${ uid }/app/notes`).get();

        noteSnap.forEach(note => {
            notes.push({
                id: note.id,
                ...note.data()
            })
        });
        
        dispatch({
            type: types.noteLoad,
            payload: notes
        });
    }
}

// Add new note
export const addNewNote = (title, description) => {
    return async(dispatch, getState) => {
        Swal.fire({
            title: 'Creating ...',
            didOpen: () => {
                Swal.showLoading();
            }
        })

        const { uid } = getState().auth;

        const newNote = {
            title,
            description,
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/app/notes`).add(newNote);

        Swal.close();

        if (doc?.id) {
            const { id } = doc;

            dispatch({
                type: types.noteAddNew,
                payload: {
                    id, ...newNote
                }
            })

            Swal.fire('Note created successfully', '', 'success');
        } else {
            Swal.fire('Note not created', '', 'error');
        }
    }
}

// Edit note
export const editNote = (id, title, description) => {
    return async(dispatch, getState) => {
        Swal.fire({
            title: 'Updating ...',
            didOpen: () => {
                Swal.showLoading();
            }    
        })

        const { uid } = getState().auth;

        const editNote = {
            title,
            description,
            date: new Date().getTime()
        }

        await db.doc(`${ uid }/app/notes/${ id }`).update(editNote);

        dispatch({
            type: types.noteUpdate,
            payload: {
                id, 
                note: {
                    id, 
                    ...editNote
                }
            }
        })

        Swal.close();

        Swal.fire('Note updated successfully', '', 'success');
    }
}

// Delete note
export const deleteNote = (id) => {
    return async(dispatch, getState) => {
        Swal.fire({
            title: 'Removing ...',
            didOpen: () => {
                Swal.showLoading();
            }
        })

        const { uid } = getState().auth;

        await db.doc(`${ uid }/app/notes/${ id }`).delete();

        dispatch({
            type: types.noteDelete,
            payload: id
        });

        Swal.close();
    }
}