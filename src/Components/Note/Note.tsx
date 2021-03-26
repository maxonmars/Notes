import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../App/store';
import {TagsBlock} from '../TagsBlock/TagsBlock';
import {NoteArea} from '../NoteArea/NoteArea';
import {TagType} from '../../redux/tags-reducer';
import {NoteType, removeNoteTC} from '../../redux/notes-reducer';
import Button from '../Button/Button';

import s from './Note.module.scss'

type PropsType = {
    note: NoteType
}

export const Note: React.FC<PropsType> = React.memo(({note, ...props}) => {
    const dispatch = useDispatch()
    const tags = useSelector<AppStateType, TagType[]>(state => state.tagsState.filter(t => t.noteId === note.id))
    const [editMode, setEditMode] = useState<boolean>(false)

    const deleteNote = () => {
        dispatch(removeNoteTC(note.id))
    }

    return (
        <div className={s.note_block}>
            <div className={s.control}>
                <Button className={s.delete_btn} onClick={deleteNote}>X</Button>
            </div>
            <div className={s.note_headline}>
                <h2>{note.title}</h2>
            </div>
            <NoteArea note={note}
                      editMode={editMode}
                      setEditMode={setEditMode}/>
            <TagsBlock tags={tags}
                       editMode={editMode}
                       noteId={note.id}/>
        </div>
    )
})
