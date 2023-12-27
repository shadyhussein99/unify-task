import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
    value: boolean;
  }
  
  const initialState: ThemeState = {
    value: false,
  };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
