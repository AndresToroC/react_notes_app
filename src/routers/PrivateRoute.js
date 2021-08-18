import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
    isAuth,
    component: Component,
    ...res
}) => {
    return (
        <Route
            { ...res }
            component={ (props) => (
                (isAuth) 
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/auth/login" /> )
            )}
        />
    );
}