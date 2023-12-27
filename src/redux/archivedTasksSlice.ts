import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tasks } from "../types/types";

export interface ArchivedTasksState {
  value: Tasks[];
}

const initialState: ArchivedTasksState = {
  value: [],
};

export const archivedTasksSlice = createSlice({
  name: "archivedTasks",
  initialState,
  reducers: {
    addArchivedTask: (state, action: PayloadAction<Tasks>) => {
      state.value.push(action.payload);
    },
    removeArchivedTask: (state, action: PayloadAction<number>) => {
      const removeTodo = state.value.filter(
        (_, index) => index !== action.payload
      );
      state.value = removeTodo;
    },
    editArchivedTask: (state, action) => {
        const { data, index } = action.payload;
        state.value[index] = data;
      },
  },
});

export const { addArchivedTask, removeArchivedTask, editArchivedTask } =
archivedTasksSlice.actions;

export default archivedTasksSlice.reducer;
