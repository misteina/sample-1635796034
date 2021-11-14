import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos-slice';

export default configureStore({
  reducer: {
    todos: todosReducer
  },
});