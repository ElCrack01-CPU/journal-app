import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeletingNote } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, tittle } = formValues;
    
    const activeId = useRef( note.id );

    useEffect(() => {
       
        if ( note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id;

        }
    }, [note, reset])
    
    useEffect(() => {

        dispatch( activeNote( formValues.id, { ...formValues } ) )

    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeletingNote(note.id, note) )

    }
    



    return (
        <div className='notes__main-content '>

            <NotesAppBar />

            <div className='notes__content'>
                <input
                    type='text'
                    name='tittle'
                    placeholder='Some awesome tittle'
                    className='notes__tittle-input'
                    value={tittle}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder='What happened today???'
                    name='body'
                    className='notes__textarea'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    (note.url)
                    && (
                        <div className='notes__image'>
                            <img src={note.url}
                                alt='imagen'
                            />

                        </div>
                    )
                }

            </div>

            <button
                className='btn btn-danger'
                onClick={ handleDelete }
            >
                Delete
            </button>


        </div>
    )
}
