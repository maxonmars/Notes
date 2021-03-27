import React, {useCallback, useState} from 'react';
import Button from '../Button/Button';
import {useDispatch} from 'react-redux';
import {getNotesListTC} from '../../redux/notes-reducer';

import s from './SearchForm.module.scss'

type PropsType = {
    callback: (value: string) => void
}

export const SearchForm: React.FC<PropsType> = React.memo(({callback}) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('')

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onSendRequest = useCallback(() => {
        callback(`#${value}`)
    }, [callback, value])

    const showAll = () => {
        dispatch(getNotesListTC())
    }

    return (
        <div className={s.search}>
            <input className={s.search_input}
                   value={value}
                   placeholder='Search...'
                   onChange={inputHandler}
            />
            <Button onClick={onSendRequest}>FILTER</Button>
            <Button onClick={showAll}>All</Button>
        </div>
    )
})
