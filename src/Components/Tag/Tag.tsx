import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {deleteTagTC, TagType} from '../../redux/tags-reducer';
import Button from '../Button/Button';

import s from './Tag.module.scss';

type PropsType = {
    tag: TagType
    editMode: boolean
}

export const Tag: React.FC<PropsType> = React.memo(({tag, editMode}) => {
    const dispatch = useDispatch()

    const removeTag = useCallback(() => {
        dispatch(deleteTagTC(tag.id))
    },[])

    return (
        <div className={s.tag}>{tag.title}
            {editMode && <Button className={s.tag_btn} onClick={removeTag}>x</Button>}
        </div>
    )
})

