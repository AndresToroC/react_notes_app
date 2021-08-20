import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../../actions/note';
import { Header } from '../layout/Header';
import { NoteModal } from './NoteModal';

export const NoteScreen = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [note, setNote] = useState({
        title: '',
        description: ''
    });

    const { notes } = useSelector(state => state.notes);
    
    const handleOpenModalNote = () => {
        setNote({
            title: '',
            description: ''
        });
        setOpen(true);
    }

    const handleEditNote = (id) => {
        const note = notes.find(note => note.id === id);
        
        setNote(note);
        setOpen(true);
    }

    const handleDeleteNote = (id) => {
        dispatch(deleteNote(id));
    }

    return (
        <>
            <div>
                <Header />
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
                    </div>
                </header>
                <main className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <button onClick={ handleOpenModalNote } className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            New note
                        </button>
                        <div className="px-4 py-6 sm:px-0">
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Title
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Date
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {
                                                        notes.map(note => (
                                                            <tr key={note.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">{note.title}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                        { note.date }
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button onClick={ () => handleEditNote(note.id) } className="text-indigo-600 hover:text-indigo-900">
                                                                        Edit
                                                                    </button>
                                                                    <button onClick={ () => handleDeleteNote(note.id) } className="ml-4 text-red-600 hover:text-red-900">
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NoteModal setOpen={ setOpen } open={ open } note={ note } />
                    </div>
                </main>
            </div>
        </>
    )
}
