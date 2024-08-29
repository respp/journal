import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved : '',
        notes : [],
        // active : {
        //     id: 'ABC123',
        //     title : '',
        //     body:'',
        //     date:1234567,
        //     imageUrls:[]
        // }
        active:null

    },
    reducers: {
        savingNewNote :(state)=>{
            state.isSaving = true
        },
        addNewEmptyNote: (state, { payload } ) => {
            state.notes.push( payload )
            state.isSaving = false
        },
        setActiveNote : (state, { payload })=>{
            state.active = payload
            state.messageSaved = ''
        },
        setNotes : (state, { payload })=>{
            // state.notes = [state.notes, ...payload]
            state.notes = payload
        },
        setSaving : (state)=>{
            state.isSaving = true
            state.messageSaved = ''
        },
        updateNote : (state, { payload })=>{
            state.isSaving = false
            state.notes = state.notes.map(note => note.id !== payload.id ? note : payload)
            state.messageSaved = `nota actualizada correctamente.`
        },
        setPhotosToActiveNote : (state, { payload })=>{
            state.active.imageUrls = [ ...state.active.imageUrls, ...payload ]
            state.isSaving = false
        },
        clearNotesLogout : (state, { payload })=>{
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.active = null
        },
        deleteNoteById : (state, { payload })=>{
            state.notes = state.notes.filter(note => note.id !== payload)
            state.messageSaved = `nota borrada correctamente.`
            state.active = null
        },
    }
});

export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById
 } = journalSlice.actions;