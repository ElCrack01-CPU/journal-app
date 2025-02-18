import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
  
    // Crear una referencia al documento específico
    const noteDocRef = collection(db, `${uid}/journal/notes`);

    // Obtener el documento
    const noteSnap = await getDocs(noteDocRef);

    const notes = [];
    noteSnap.forEach((snap) => {
      notes.push({
        id: snap.id,
        ...snap.data(),
      });
    });
  
    return notes; // Esto debe ser un array
  }

