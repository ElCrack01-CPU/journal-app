import React from 'react'
import { setFile, startSaveNote, startUpLoading } from '../../actions/notes'
import { useDispatch, useSelector } from 'react-redux'

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector( state => state.notes);

    const handleSave = () => {
        dispatch (startSaveNote( note ));
    }

    const handlePictureClick = () => {
        document.querySelector( '#fileSelector' ).click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch(setFile( file));
            dispatch( startUpLoading(file) );
        }
    }


  return (
    <div className='notes__appbar '>
        <span>29 de Diciembre 2024</span>

        <input
            id='fileSelector'
            type='file'
            name='file'
            style={ { display: 'none' } }
            onChange={ handleFileChange }
        />


        <div>
            <button
                className='btn'
                onClick={ handlePictureClick }
            >
                Picture
            </button>
            <button
                className='btn'
                onClick={ handleSave }
            >
                Save
            </button>
        </div>
        
    </div>
  )
}
