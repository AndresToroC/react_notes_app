import Swal from 'sweetalert2';

import { types } from '../types/type';
import { firebase } from '../firebase/firebase-config';

// Dispara accion para actualizar el state
export const userAuth = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid, displayName
    }
});

// Login User
export const loginAuth = (email,  password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(userAuth(user.uid, user.displayName));
            }).catch(e => {
                Swal.fire('Error Login', e.message, 'error');
            })
    }
}

// Register user
export const registerUserAuth = (name, email, password) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({ user }) => {
                await user.updateProfile({ displayName: name });

                dispatch(userAuth(user.uid, user.displayName));
            }).catch(e => {
                Swal.fire('Error register', e.message, 'error');
            })
    }
}