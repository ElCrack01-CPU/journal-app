import Swal from 'sweetalert2';
import { googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        const auth = getAuth();
        dispatch(startLoading());
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {

                dispatch(
                    login(user.uid, user.displayName)
                );
                dispatch(finishLoading());
            })
            .catch( e => {
                dispatch( finishLoading() );
                Swal.fire( 'Error', e.message, 'error' );
            } )
    }

};

export const startRegisterWithEmailPasswordName = (name, email, password) => {
    return (dispatch) => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name });
                dispatch(
                    login(user.uid, user.displayName)
                );
            })
            .catch( e => {
                Swal.fire( 'Error', e.message, 'error' );
            } )

    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        const userCred = signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })

    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})


export const startLogout = () => {

    return async(dispatch) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch ( logout() );
        dispatch ( noteLogout() );

    }
}

const logout = () => ({
    type: types.logout
})




