import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {notesReducer} from '../redux/notes-reducer';
import {tagsReducer} from '../redux/tags-reducer';

export const rootReducer = combineReducers({
    appState: notesReducer,
    tagsState: tagsReducer,
})

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>


export type AppStateType = ReturnType<typeof rootReducer>
export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
