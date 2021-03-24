import React, {ChangeEvent, useCallback, useState} from 'react';
import {v1} from 'uuid';
import {useDispatch} from 'react-redux';
import {addNewTagTC, TagType} from '../../redux/tags-reducer';
import Button from '../Button/Button';

import s from './AddTagForm.module.scss';

type PropsType = {
    noteId: string
}

export const AddTagForm: React.FC<PropsType> = React.memo(({noteId}) => {
    const dispatch = useDispatch()
    const [tagText, setTagText] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTagText(e.currentTarget.value)
    }

    const addTag = useCallback(() => {
        if (tagText.trim() !== '') {
            const newTagObj: TagType = {
                id: v1(),
                title: `#${tagText}`,
                noteId: noteId
            }
            dispatch(addNewTagTC(newTagObj))
            setTagText('')
        } else {
            setError('Title is required')
        }

    }, [tagText])

    return (
        <div className={s.tag_input_block}>
            <input className={s.tag_input}
                   onChange={onChangeHandler}
                   value={tagText}
                   type="text" placeholder='add tag...'/>
            <Button onClick={addTag}>Add Tag</Button>
        </div>
    )
})

