import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'todos',
  initialState: {
    value: [],
  },
  reducers: {
    updateTodosList: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value = [...state.value, ...action.payload]
    }
  },
});

export const { updateTodosList } = slice.actions;

export const selectTodos = state => state.todos.value;

export default slice.reducer;
