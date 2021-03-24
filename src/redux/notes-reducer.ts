import {ThunkDispatch} from 'redux-thunk';
import {notesAPI} from '../API/api';
import {AppStateType, InferActionsTypes} from '../App/store';

export type NoteType = {
    id: string
    title: string
    noteText: string
    created_date: number //date time
    updated_date: number //date time
}

const initializeState: NoteType[] = []
type InitialStateType = typeof initializeState
type ActionsType = InferActionsTypes<typeof actions>

const findNotesObject = (idArr: string[], notesArr: NoteType[]) => {
    let arr = []
    for (let i = 0; i < notesArr.length; i++) {
        for (let j = 0; j < idArr.length; j++) {
            if (notesArr[i].id === idArr[j]) {
                arr.push(notesArr[i])
            }
        }
    }
    return arr
}

export const notesReducer = (state: InitialStateType = initializeState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'TE/NOTES/SET_NOTES':
            return [...action.notes]
        case 'TE/NOTES/ADD_NOTE':
            return [action.note, ...state]
        case 'TE/NOTES/DELETE_NOTE':
            return state.filter(tl => tl.id !== action.id)
        case 'TE/NOTES/CHANGE_NOTE':
            return state.map(note => note.id === action.note.id ? action.note : note)
        case 'TE/NOTES/FIND_NOTES':
            return findNotesObject(action.nodesID, [...state])
        default:
            return state;
    }
};

//Actions
export const actions = {
    setNotes: (notes: NoteType[]) => ({type: 'TE/NOTES/SET_NOTES', notes} as const),
    addNote: (note: NoteType) => ({type: 'TE/NOTES/ADD_NOTE', note} as const),
    deleteNote: (id: string) => ({type: 'TE/NOTES/DELETE_NOTE', id} as const),
    changeNote: (note: NoteType) => ({type: 'TE/NOTES/CHANGE_NOTE', note} as const),
    setNodesFilter: (nodesID: string[]) => ({type: 'TE/NOTES/FIND_NOTES', nodesID} as const)
}

//Thunks
export const getNotesListTC = () => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    try {
        const res = await notesAPI.getNotes()
        dispatch(actions
            .setNotes(
                res.data.sort((a: any, b: any) => {
                    return b.created_date - a.created_date
                })
            )
        );
        console.log('get Notes:SUCCESS!')
    } catch (e) {
        console.log('get Notes:CATCH!')
    }
};
export const addNewNoteTC = (newNote: NoteType) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    try {
        await notesAPI.addNote(newNote)
        dispatch(actions.addNote(newNote));
        console.log('post Notes:SUCCESS!')
    } catch (e) {
        console.log('post Notes:CATCH!')
    }
};
export const removeNoteTC = (id: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    try {
        await notesAPI.deleteNote(id)
        dispatch(actions.deleteNote(id));
        console.log('post Notes:SUCCESS!')
    } catch (e) {
        console.log('post Notes:CATCH!')
    }
};
export const updateNoteTC = (updateNoteObj: NoteType) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    try {
        await notesAPI.changeNote(updateNoteObj)
        dispatch(actions.changeNote(updateNoteObj));
        console.log('put Notes:SUCCESS!')
    } catch (e) {
        console.log('put Notes:CATCH!')
    }
};




