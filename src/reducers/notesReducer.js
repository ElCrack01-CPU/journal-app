import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null,
    file: null,
    
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: action.payload,                    
            };
        case types.notesAddEntry:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            };
            case types.notesSetFile: // Acción para establecer el archivo
            return {
                ...state,
                file: action.payload,
            };


        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            };
        case types.notesUpdated:
            return {
                ...state,
                active: {
                    ...state.active,
                    ...action.payload.note
                },
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                ),

                

            };
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload),
                
            };
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []

            }



        default:
            return state;
    }


}
