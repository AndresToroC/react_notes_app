import Swal from 'sweetalert2';

import { types } from '../types/type';
import { firebase } from '../firebase/firebase-config';

// Dispara accion para actualizar el state
export const userAuth = (uid, displayName, email) => ({
    type: types.login,
    payload: {
        uid, displayName, email
    }
});

// Login User
export const loginAuth = (email,  password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(userAuth(user.uid, user.displayName, user.email));
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

                dispatch(userAuth(user.uid, user.displayName, user.email));
            }).catch(e => {
                Swal.fire('Error register', e.message, 'error');
            })
    }
}

// Logout
export const logoutUserAuth = () => {
    return (dispatch) => {
        firebase.auth().signOut();

        dispatch({
            type: types.logout
        })
    }
}

// Updated profile
export const updatedProfile = (name, password) => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged(async(user) => {
            if (user?.uid) {
                await user.updateProfile({ displayName: name });
    
                if (password) {
                    await user.updatePassword(password);
                }
    
                dispatch(userAuth(user.uid, user.displayName, user.email));
            }
        })
    }
}