import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { getAuth } from 'firebase/auth';
import { setFile, startNewNote } from '../../actions/notes';

export const Sidebar = () => {
    const auth = getAuth();
    const { displayName } = auth.currentUser || {};
    const dispatch = useDispatch();

    const file = useSelector(state => state.notes.file);

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddEntry = () => {
        dispatch( startNewNote(file) );
        setFile(null);
    }




  return (
    <aside className='journal__sidebar'>
        <div className='journal__sidebar-navbar'>
            <h3 className='mt-5'>
                <i className='far fa-moon'/>
                <span> { displayName ? displayName : 'Usuario' } </span>
            </h3>

            <button
                className='btn'
                onClick={ handleLogout }
            >
                Logout
            </button>

        </div>

        <div className='journal__new-entry'
            onClick={ handleAddEntry }
        >
            <i className='far fa-calendar-plus fa-5x'/>
            <p className='mt-3'>
                New Entry
            </p>
            
        </div>

        <JournalEntries/>
        
    </aside>
  )
}
