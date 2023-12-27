import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tasks } from "../types/types";

export interface CurrentTasksState {
  value: Tasks[];
}

const initialState: CurrentTasksState = {
  value: [],
};

export const currentTasksSlice = createSlice({
  name: "currentTasks",
  initialState,
  reducers: {
    addCurrentTask: (state, action: PayloadAction<Tasks>) => {
      state.value.push(action.payload);
    },
    removeCurrentTask: (state, action: PayloadAction<number>) => {
      const removeTodo = state.value.filter(
        (todo, index) => index !== action.payload
      );
      state.value = removeTodo;
    },
    editCurrentTask: (state, action) => {
      const { data, index } = action.payload;
      state.value[index] = data;
    },
  },
});

export const { addCurrentTask, removeCurrentTask, editCurrentTask } =
  currentTasksSlice.actions;

export default currentTasksSlice.reducer;
