import {AppStateType} from './store';

export const selectorNotesList = (state: AppStateType) => state.appState
export const selectorTagsList = (state: AppStateType) => state.tagsState

