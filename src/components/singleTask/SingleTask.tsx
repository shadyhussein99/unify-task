// Component of single TODO using in Current TODOs and Archived TODOs

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  addCurrentTask,
  removeCurrentTask,
  editCurrentTask,
} from "../../redux/currentTasksSlice";
import {
  addArchivedTask,
  removeArchivedTask,
  editArchivedTask,
} from "../../redux/archivedTasksSlice";

import { SubmitHandler, useForm } from "react-hook-form";

import { Tasks } from "../../types/types";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import TaskForm from "../taskForm/TaskForm";

type SingleTaskProps = {
  index: number;
  task: Tasks;
  status: "current" | "archived";
};

function SingleTask({ index, task, status }: SingleTaskProps) {
  const { setValue } = useForm();

  const currentTasks = useSelector(
    (state: RootState) => state.currentTasks.value
  );
  const archivedTasks = useSelector(
    (state: RootState) => state.archivedTasks.value
  );
  const dispatch = useDispatch();

  const [editTodo, setEditTodo] = useState({
    isEdit: false,
    order: 0,
  });

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  // Used to set the title and description while editing
  useEffect(() => {
    if (editTodo.isEdit) {
      if (status === "current") {
        const requiredTask = currentTasks.find(
          (_, index) => index === editTodo.order
        );

        if (requiredTask) {
          setTodoTitle(requiredTask?.title);
          setTodoDescription(requiredTask?.description);
        }
      } else {
        const requiredTask = archivedTasks.find(
          (_, index) => index === editTodo.order
        );

        if (requiredTask) {
          setTodoTitle(requiredTask?.title);
          setTodoDescription(requiredTask?.description);
        }
      }
    }
  }, [editTodo.isEdit, editTodo.order, currentTasks, archivedTasks, status, setValue]);

  // Edit TODO
  const onSubmit: SubmitHandler<Tasks> = (data) => {
    const index = editTodo.order;

    if (status === "current") {
      dispatch(editCurrentTask({ data, index }));
    } else {
      dispatch(editArchivedTask({ data, index }));
    }

    setEditTodo({
      isEdit: false,
      order: index,
    });
  };

  // Delete TODO
  const handleDeleteTodo = (todoIndex: number) => {
    if (status === "current") {
      dispatch(removeCurrentTask(todoIndex));
    } else {
      dispatch(removeArchivedTask(todoIndex));
    }
  };

  const showEditForm = (todoIndex: number) => {
    if (todoIndex === editTodo.order) {
      setEditTodo((prev) => {
        return {
          isEdit: !prev.isEdit,
          order: todoIndex,
        };
      });
    } else {
      setEditTodo({
        isEdit: true,
        order: todoIndex,
      });
    }
  };

  // Archive TODO
  const handleArchiveTodo = (todoIndex: number) => {
    const requiredTodo = currentTasks.find(
      (_, index) => index === todoIndex
    );

    if (requiredTodo) {
      dispatch(addArchivedTask(requiredTodo));
    }

    dispatch(removeCurrentTask(todoIndex));
  };

  // Restore TODO
  const handleRestoreTodo = (todoIndex: number) => {
    const requiredTodo = archivedTasks.find(
      (_, index) => index === todoIndex
    );

    if (requiredTodo) {
      dispatch(addCurrentTask(requiredTodo));
    }

    dispatch(removeArchivedTask(todoIndex));
  };

  return (
    <Grid item xs={11} md={5}>
      <Paper style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Title</Typography>
          <div
            style={{
              display: "flex",
              gap: "0.7em",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="subtitle2"
              style={{ textDecoration: "underline" }}
              onClick={() => showEditForm(index)}
            >
              Edit
            </Typography>
            {status === "current" ? (
              <Typography
                variant="subtitle2"
                style={{ textDecoration: "underline" }}
                onClick={() => handleArchiveTodo(index)}
              >
                Archive
              </Typography>
            ) : (
              <Typography
                variant="subtitle2"
                style={{ textDecoration: "underline" }}
                onClick={() => handleRestoreTodo(index)}
              >
                Restore
              </Typography>
            )}
            <DeleteIcon
              onClick={() => handleDeleteTodo(index)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        {editTodo.isEdit && editTodo.order === index ? (
          <TaskForm
            onSubmit={(data) => onSubmit(data)}
            buttonName="Edit"
            title={todoTitle}
            description={todoDescription}
          />
        ) : (
          <>
            <Typography variant="subtitle1" gutterBottom>
              {task.title}
            </Typography>
            <Typography variant="h6">Description</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {task.description}
            </Typography>
          </>
        )}
      </Paper>
    </Grid>
  );
}

export default SingleTask;
