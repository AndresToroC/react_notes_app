import React from 'react'
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginAuth } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'
import Swal from 'sweetalert2';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        if (!validator.isEmail(email)) {
            Swal.fire({
                title: 'Invalid email',
                icon: 'error'
            })
            return false;
        }
        
        dispatch(loginAuth(email, password))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={ handleSubmitLogin }>
                    <div className="">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                autoFocus
                                className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
                                placeholder="example@gmail.com"
                                value={ email }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
                                placeholder="****"
                                value={ password }
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>

                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Recuerdame
                        </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                ¿Olvidastes tu contraseña?
                            </Link>
                        </div>
                    </div> */}

                    <div>
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log in
                        </button>
                        <Link
                        to="/auth/register"
                        className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Sign up
                        </Link >
                    </div>
                </form>
            </div>
        </div>
    )
}
