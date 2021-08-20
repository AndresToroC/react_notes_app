import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addNewNote, editNote } from '../../actions/note';

export const NoteModal = ({ setOpen, open, note }) => {
    const dispatch = useDispatch();
    const cancelButtonRef = useRef(null);
    
    const [formValues, handleInputChange, reset] = useForm({
        title: '',
        description: ''
    });

    const { title, description } = formValues;  

    const handleSubmitNote = (e) => {
        e.preventDefault();
        
        if (note?.id) {
            // Se actualiza
            dispatch(editNote(note.id, title, description));
        } else {
            // Se crea
            dispatch(addNewNote(title, description));
        }
        
        reset({
            title: '',
            description: ''
        });

        setOpen(false);
    } 
    
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    auto-reopen="true"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <form onSubmit={ handleSubmitNote }>
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                {
                                                    (!note?.id)
                                                        ? 'Add new note'
                                                        : 'Edit note'
                                                }
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-12 mt-3">
                                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id="title"
                                                            required
                                                            value={ title }
                                                            onChange={ handleInputChange }
                                                            className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
                                                        />
                                                    </div>
                                                    <div className="col-span-12">
                                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            id="description"
                                                            name="description"
                                                            rows={3}
                                                            required
                                                            onChange={ handleInputChange }
                                                            className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                            defaultValue={ description }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}