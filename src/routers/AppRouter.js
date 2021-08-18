import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import { firebase } from '../firebase/firebase-config';

import { NoteScreen } from '../components/note/NoteScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { userAuth } from '../actions/auth';
import { useDispatch } from 'react-redux';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    // Se verifica si el usuario esta logueado
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user) => {
            if (user?.uid) {
                dispatch(userAuth(user.uid, user.displayName));
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }

            setIsChecking(false);
        })
    }, [dispatch, setIsLogin, setIsChecking])

    if (isChecking) {
        return (
            <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{ top: '50%' }}>
                    <i class="fas fa-circle-notch fa-spin fa-5x"></i>
                </span>
            </div>
        );
    }

    return (
        <Router>
            <Switch>
                <PublicRoute 
                    path="/auth"
                    component={ AuthRouter }
                    isAuth={ isLogin }
                />
                <PrivateRoute 
                    exact
                    path="/"
                    component={ NoteScreen }
                    isAuth={ isLogin }
                />
            </Switch>
        </Router>
    )
}
