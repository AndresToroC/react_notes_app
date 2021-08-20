import { types } from '../types/type';

const initialState = {
    notes: []
};

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.noteLoad:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.noteAddNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }

        case types.noteUpdate:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case types.noteDelete:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        default:
            return state;
    }
}