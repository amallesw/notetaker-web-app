import { combineReducers } from '@reduxjs/toolkit';
import { notesSlice } from '../features/notesSlice';

const rootReducer = combineReducers({
  folders: notesSlice.reducer,
});

export default rootReducer;
