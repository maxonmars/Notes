import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {v1} from 'uuid';
import {NoteType, updateNoteTC} from '../../redux/notes-reducer';
import {addNewTagTC, TagType} from '../../redux/tags-reducer';
import Button from '../Button/Button';
import Highlighter from "react-highlight-words";

import s from './NoteArea.module.scss';

type PropsType = {
    note: NoteType
    editMode: boolean
    setEditMode: (value: boolean) => void
    tags: TagType[]
}

export const NoteArea: React.FC<PropsType> = React.memo(({note, editMode, setEditMode, tags}) => {
    const dispatch = useDispatch()
    const [areaText, setAreaText] = useState<string>(note.noteText)
    const [localTag, setLocalTag] = useState<string[]>([])
    const [scrollTopPosition, setScrollTopPosition] = useState<any>(0)

    const areaRef = useRef()
    const backScroll = useRef()

    useEffect(()=>{
        if(areaRef.current){
            console.log('set layout')
        //@ts-ignore
        // setScrollTopPosition(areaRef.current.scrollTop)
        }

        if(backScroll.current){
            console.log('back = top')
            //@ts-ignore
            backScroll.current.scrollTop = scrollTopPosition
        }
    },[scrollTopPosition,areaText])

    const textareaHandler = (e: any) => {
        //@ts-ignore
        // setScrollTopPosition(areaRef.current.scrollTop)
        setAreaText(e.currentTarget.value)
    }

    let onScrollHandler = () => {
        //@ts-ignore
        setScrollTopPosition(areaRef.current.scrollTop)
    };

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

    const addTagOnKeyPress = (e: any) => {
        //@ts-ignore
        console.log(areaRef.current.scrollTop)
        //@ts-ignore
        setScrollTopPosition((prevState: any)=> prevState - 6)
        if (e.keyCode === 32 && tagsArray && tagsArray.length) {
            const tag = tagsArray ? tagsArray[0] : ''
            const newTagObj: TagType = {
                id: v1(),
                title: tag,
                noteId: note.id
            }
            setAreaText(areaText.replace(/#/g, ''))
            setLocalTag([newTagObj.title.replace(/#/g, ''), ...localTag,])
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
                    <div className={s.textContainer}>

                        <div className={s.highlighterContainer}
                            //@ts-ignore
                             ref={backScroll}>

                            <Highlighter
                                className={s.highlighter}
                                searchWords={localTag}
                                textToHighlight={areaText}
                            />
                        </div>

                        <textarea className={s.text_area}
                                  autoFocus
                                  onKeyDown={addTagOnKeyPress}
                                  onChange={textareaHandler}
                                  value={areaText}
                            //@ts-ignore
                                  ref={areaRef}
                                  onScroll={onScrollHandler}
                        />

                    </div>

            }
        </div>
    )
})