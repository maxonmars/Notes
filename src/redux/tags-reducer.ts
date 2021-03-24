import {ThunkDispatch} from 'redux-thunk';
import {tagsAPI} from '../API/api';
import {AppStateType, InferActionsTypes} from '../App/store';

export type TagType = {
    id: string
    title: string
    noteId: string
}

const initializeState: TagType[] = []
type ActionsType = InferActionsTypes<typeof actions>
type InitialStateType = typeof initializeState

export const tagsReducer = (state: InitialStateType = initializeState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'TE/TAGS/SET_TAGS':
            return [...action.tags]
        case 'TE/TAGS/ADD_TAG':
            return [...state, action.tag]
        case 'TE/TAGS/REMOVE_TAG':
            return state.filter(t => t.id !== action.tagId)
        default:
            return state;
    }
};

//Actions
export const actions = {
    setTags: (tags: TagType[]) => ({type: 'TE/TAGS/SET_TAGS', tags} as const),
    addTag: (tag: TagType) => ({type: 'TE/TAGS/ADD_TAG', tag} as const),
    removeTag: (tagId: string) => ({type: 'TE/TAGS/REMOVE_TAG', tagId} as const)
}

///Thunks
export const getTagsListTC = () => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    try {
        const res = await tagsAPI.getTags()
        dispatch(actions.setTags(res.data));
        console.log('get tags:SUCCESS!')
    } catch (e) {
        console.log('get tags:CATCH!')
    }
};

export const addNewTagTC = (newTag: TagType) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    try {
        await tagsAPI.addTag(newTag)
        dispatch(actions.addTag(newTag));
        console.log('post tags:SUCCESS!')
    } catch (e) {
        console.log('post tags:CATCH!')
    }
};

export const deleteTagTC = (tagId: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    try {
        await tagsAPI.deleteTag(tagId)
        await dispatch(actions.removeTag(tagId));
        console.log('post tags:SUCCESS!')
    } catch (e) {
        console.log('post tags:CATCH!')
    }
};





