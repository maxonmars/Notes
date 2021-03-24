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
            const newTagObj: TagType = {
                id: v1(),
                title: tagsArray ? tagsArray[0] : '',
                noteId: note.id
            }
            setAreaText(areaText.replace(/#/g, ''))
            dispatch(addNewTagTC(newTagObj))
        }
    }
    let test = ['foo', 'baz', 'bar']

    return (
        <>
            <div className={s.note_text_control}>
                <Button onClick={changeNote}>Save</Button>
            </div>
            {
                !editMode
                    ? <div className={s.note_text} onDoubleClick={changeEditMode}>{areaText}</div>
                    :
                    <textarea className={s.text_area}
                              autoFocus
                              onKeyUp={addTagOnKeyPress}
                              onChange={textareaHandler}
                              value={areaText}> 11111111</textarea>
            }
        </>
    )
})


//
// const [res, setRes] = useState(areaText)
// const markMatches = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     let res = test.join(' ')
//     const req = e.target.value;//текст с инпута
//     if (req) {
//         const normReq = req
//             .toLowerCase()
//             .replace(/\s+/g, ' ')
//             .trim()
//             .split(' ')
//             .sort((a, b) => b.length - a.length);
//         res = res.replace(
//             new RegExp(`(${normReq.join('|')})`, 'gi'),
//             match => '<mark>' + match + '</mark>'
//         );
//     }
//     setRes(res);
// }

