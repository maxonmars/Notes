import React, {useCallback, useEffect} from 'react';
import {v1} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import {selectorNotesList, selectorTagsList} from './selectors';
import {AddNoteForm} from '../Components/AddNoteForm/AddNoteForm';
import {Note} from '../Components/Note/Note';
import {getTagsListTC} from '../redux/tags-reducer';
import {actions, addNewNoteTC, getNotesListTC, NoteType} from '../redux/notes-reducer';
import {SearchForm} from '../Components/SearchInput/SearchForm';

import s from './App.module.scss'

export const App: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const notesArr = useSelector(selectorNotesList)
    const tagsArr = useSelector(selectorTagsList)

    const addNote = (title: string,) => {
        const newNoteObj: NoteType = {
            id: v1(),
            title: title,
            noteText: 'Fake task...',
            created_date: new Date().getTime(),
            updated_date: new Date().getTime()
        }
        dispatch(addNewNoteTC(newNoteObj))
    }

    useEffect(() => {
        dispatch(getNotesListTC())
    }, [])
    useEffect(() => {
        dispatch(getTagsListTC())
    }, [])

    const findNote = (value: string) => {
        const notesId = tagsArr.filter(t => t.title === value).map(t => t.noteId)
        dispatch(actions.setNodesFilter(notesId))
    }

    const mappedNotes = useCallback(() => {
        return notesArr && notesArr.map((note, index) => {
            return <Note key={note.id}
                         note={note}
            />
        })
    }, [notesArr])
    return (
        <div className={s.app}>
            <h1 className={s.app_name}>notes app</h1>
            <AddNoteForm callback={addNote}/>
            <SearchForm callback={findNote}/>
            <div className={s.notes_wrapper}>
                {
                    mappedNotes()
                }
            </div>
        </div>
    );
})
