import React from 'react'
import validator from 'validator';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { registerUserAuth } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const { name, email, password, password_confirmation } = formValues;

    const handleSubmitRegister = (e) => {
        e.preventDefault();

        if (!validator.isEmail(email)) {
            Swal.fire({
                title: 'Invalid email',
                icon: 'error'
            })

            return false;
        } else if (password.length < 6 || password !== password_confirmation) {
            Swal.fire({
                title: 'The password does not match or is less than 6 characters',
                icon: 'error'
            })

            return false
        }
        
        dispatch(registerUserAuth(name, email, password));
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
                <form className="mt-8 space-y-6" onSubmit={ handleSubmitRegister }>
                    <div className="">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="name"
                                required
                                autoFocus
                                className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="name"
                                value={ name }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                                className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="****"
                                value={ password }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Password confirmation
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                required
                                className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="****"
                                value={ password_confirmation }
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                    <div>
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </button>
                        <Link
                        to="/auth/login"
                        className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            If you already have an account, log in
                        </Link >
                    </div>
                </form>
            </div>
        </div>
    )
}
