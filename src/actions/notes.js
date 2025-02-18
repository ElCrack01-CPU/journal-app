import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";
import Swal from "sweetalert2";


export const startNewNote = (file) => {
    return async (dispatch) => {
        const auth = getAuth();
        const { uid } = auth.currentUser;

        const newNote = {
            tittle: '',
            body: '',
            date: new Date().getTime()
        }

        const notesCollectionRef = collection(db, `${uid}/journal/notes`);
        const docRef = await addDoc(notesCollectionRef, newNote);

        let fileUrl = null;
        if (file) {
            try {
                fileUrl = await fileUpload(file); // Subir la imagen y obtener la URL
            } catch (error) {
                console.error('Error al subir la imagen:', error);
                return Swal.fire('Error', 'No se pudo subir la imagen', 'error');
            }
        }

        // Si se subió una imagen, agregar la URL al objeto newNote
        if (fileUrl) {
            newNote.url = fileUrl;
        }

        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id, newNote))

    }
}

export const setFile = (file) => ({
    type: types.notesFileUrl,
    payload: file,
});

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = (id, note) => ({
    type: types.notesAddEntry,
    payload: {
        id,
        ...note
    }

})

export const startLoaddingNote = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }


        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
        await setDoc(noteRef, noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved', note.tittle, 'success');

    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note,
        }
    }
});

export const startUpLoading = (file) => {
    return async (dispatch, getState) => {
        const { active } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const fileUrl = await fileUpload(file);

            const updatedNote = {
                ...active,
                url: fileUrl
            };

            dispatch(refreshNote(active.id,updatedNote));
            Swal.close();

        } catch (error) {
            console.error('Error al subir la imagen:', error);
            Swal.close();
            Swal.fire('Error', 'Failed to upload image', 'error');
        }
    };
};

export const startDeletingNote = (id, note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const noteRef = doc(db, `${uid}/journal/notes/${id}`);
        await deleteDoc(noteRef);
        dispatch(deleteNote(id));
        Swal.fire('Deleted', note.tittle, 'success');

    }
}

export const deleteNote = (id) => ({

    type: types.notesDelete,
    payload: id,
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning,

})