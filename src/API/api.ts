import axios from 'axios'
import {NoteType} from '../redux/notes-reducer';
import {TagType} from '../redux/tags-reducer';

const defaultOptions = {
    withCredentials: true,
    baseURL: 'http://localhost:3001',
    headers: {
        Accept: 'application/json',
    }
}

export const axiosInstance = axios.create(defaultOptions);

//API
export const notesAPI = {
    getNotes() {
        return axiosInstance.get<NoteType[]>(`/notes`)
            .then(res => res)
    },

    addNote(newNote: NoteType) {
        return axiosInstance.post(`/notes`, newNote)
            .then(res => res)
    },

    deleteNote(id: string) {
        return axiosInstance.delete(`/notes/${id}`)
            .then(res => res)
    },

    changeNote(updateNoteObj: NoteType) {
        return axiosInstance.put(`/notes/${updateNoteObj.id}`, updateNoteObj)
            .then(res => res)
    },
}

export const tagsAPI = {
    getTags() {
        return axiosInstance.get(`/tags`)
            .then(res => res)
    },

    addTag(tag: TagType) {
        return axiosInstance.post(`/tags`, tag)
            .then(res => res)
    },

    deleteTag(tagId: string) {
        return axiosInstance.delete(`/tags/${tagId}`)
            .then(res => res)
    },
}
