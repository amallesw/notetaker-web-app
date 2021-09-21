import { configureStore } from '@reduxjs/toolkit';
import notesSlice from '../features/notesSlice';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});


export default store;