import React, {useCallback} from 'react';
import {Tag} from '../Tag/Tag';
import {AddTagForm} from '../AddTagForm/AddTagForm';
import {TagType} from '../../redux/tags-reducer';

import s from './TagsBlock.module.scss';

type PropsType = {
    tags: TagType[]
    noteId: string
    editMode: boolean
}

export const TagsBlock: React.FC<PropsType> = React.memo(({tags, noteId, editMode}) => {

    const mappedTags = useCallback(() => {
        return tags && tags.map(tag => <Tag key={tag.id}
                                            tag={tag}
                                            editMode={editMode}/>
        )
    }, [tags, noteId])

    return (
        <>
            <div className={s.tags_block}>
                {
                    mappedTags()
                }
                {!tags.length && <div style={{color: ' #90d88c'}}>No tags</div>}
            </div>
            <AddTagForm noteId={noteId}/>
        </>
    )
})

