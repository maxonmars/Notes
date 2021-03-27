import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {v1} from 'uuid';
import {NoteType, updateNoteTC} from '../../redux/notes-reducer';
import {addNewTagTC, TagType} from '../../redux/tags-reducer';
import Button from '../Button/Button';

import s from './NoteArea.module.scss';

type PropsType = {
    note: NoteType
    editMode: boolean
    setEditMode: (value: boolean) => void
}

export const NoteArea: React.FC<PropsType> = React.memo(({note, editMode, setEditMode}) => {
    const dispatch = useDispatch()
    const [areaText, setAreaText] = useState<string>(note.noteText)

    const textareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAreaText(e.currentTarget.value)
    }

    const changeEditMode = useCallback(() => {
        setEditMode(true)
    }, [])

    const changeNote = async () => {
        const clearedAreaFiled = await areaText.replace(/#/g, '')
        const updateNoteObj: NoteType = {
            id: note.id,
            title: note.title,
            noteText: clearedAreaFiled,
            created_date: note.created_date,
            updated_date: new Date().getTime()
        }
        dispatch(updateNoteTC(updateNoteObj))
        setEditMode(false)
    }

    const tagsArray = areaText.match(/#[0-9A-Za-zА-Яа-яё]+/g);

    const addTagOnKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 32 && tagsArray && tagsArray.length) {
            const tag = tagsArray ? tagsArray[0] : ''
            const newTagObj: TagType = {
                id: v1(),
                title: tag,
                noteId: note.id
            }
            setAreaText(areaText.replace(/#/g, ''))
            dispatch(addNewTagTC(newTagObj))
        }
    }

    return (
        <div className={s.area_block}>
            <div className={s.area_control}>
                <Button className={s.save_btn} onClick={changeNote}>Save</Button>
                <Button className={s.save_btn} onClick={changeEditMode}>Edit</Button>
            </div>
            {
                !editMode
                    ? <div className={s.note_text}>{areaText}</div>
                    :
                    <textarea className={s.text_area}
                              autoFocus
                              onKeyUp={addTagOnKeyPress}
                              onChange={textareaHandler}
                              value={areaText}/>

            }
        </div>
    )
})
