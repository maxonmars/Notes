import React, {ChangeEvent, useCallback, useState} from 'react';
import Button from '../Button/Button';

import s from './AddNoteForm.module.scss';

type PropsType = {
    callback: (title: string) => void
}

export const AddNoteForm: React.FC<PropsType> = ({callback}) => {
    const [noteText, setNoteText] = useState<string>('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNoteText(e.currentTarget.value)
    }

    const addNewNote = useCallback(() => {
        callback(noteText)
        setNoteText('')
    }, [noteText])

    return (
        <div className={s.adding_form}>
            <input className={s.adding_form_input}
                   onChange={inputHandler}
                   value={noteText}
                   type="text"
                   placeholder='Enter note title'/>
            <div className={s.none_btn_wrapper}>
                <Button className={s.note_btn} onClick={addNewNote}>Add note</Button>
            </div>
        </div>
    )
}

