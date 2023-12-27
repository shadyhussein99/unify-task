import { combineReducers } from '@reduxjs/toolkit';
import currentTasksReducer, { CurrentTasksState } from './currentTasksSlice';
import archivedTasksReducer, { ArchivedTasksState } from './archivedTasksSlice';
import themeReducer, {ThemeState} from './themeSlice';

export const rootReducer = combineReducers({
  currentTasks: currentTasksReducer,
  archivedTasks: archivedTasksReducer,
  theme: themeReducer,
});

export type RootState = {
  currentTasks: CurrentTasksState;
  archivedTasks: ArchivedTasksState;
  theme: ThemeState;
};
