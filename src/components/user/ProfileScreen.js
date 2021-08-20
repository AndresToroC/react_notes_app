import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { updatedProfile } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { Header } from '../layout/Header';

export const ProfileScreen = () => {
    const dispatch = useDispatch();

    const { name:displayName, email:emailUser } = useSelector(state => state.auth)
    const [formValues, handleInputChange] = useForm({
        name: displayName,
        email: emailUser,
        password: '',
        password_comfirmation: ''
    });

    const { name, email, password, password_comfirmation } = formValues;

    const handleUpdatedProfile = (e) => {
        e.preventDefault();
        
        if (name.length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'Invalid name',
                icon: 'error'
            });

            return false;
        } else if (password.length > 0) {
            if (password.length < 6 || password !== password_comfirmation) {
                Swal.fire({
                    title: 'Error',
                    text: 'The password does not match or is less than 6 characters',
                    icon: 'error'
                });

                return false;
            }
        }

        dispatch(updatedProfile(name, password));

        Swal.fire({
            title: 'Updated profile',
            icon: 'success'
        })

        return true;
    }

    return (
        <>
            <div>
                <Header />
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                    </div>
                </header>
                <main className="min-h-screen bg-gray-50 ">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <form onSubmit={ handleUpdatedProfile }>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={ name }
                                            onChange={ handleInputChange }
                                            className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            disabled={ true }
                                            value={ email }
                                            onChange={ handleInputChange }
                                            className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={ password }
                                            onChange={ handleInputChange }
                                            className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
                                        />
                                        <span className="flex items-center font-medium tracking-wide text-gray-500 text-xs mt-1 ml-1">
                                            Leave blank if not updating
                                        </span>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Password confirmation
                                        </label>
                                        <input
                                            type="password"
                                            name="password_comfirmation"
                                            id="password_comfirmation"
                                            value={ password_comfirmation }
                                            onChange={ handleInputChange }
                                            className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
                                        />
                                    </div>
                                </div>
                                <button className="mt-5 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
