import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCurrentTask } from "../../redux/currentTasksSlice";
import { SubmitHandler } from "react-hook-form";

import { Tasks } from "../../types/types";

import Button from "@mui/material/Button";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

import TaskForm from "../taskForm/TaskForm";

import styles from "./addTask.module.css";

function AddTask() {
  const dispatch = useDispatch();

  const [dislayTaskForm, setDislayTaskForm] = useState(false);

  const [todoTitle, setTodoTitle] = useState<string | null>("");
  const [todoDescription, setTodoDescription] = useState<string | null>("");

  const onSubmit: SubmitHandler<Tasks> = (data) => {
    dispatch(addCurrentTask(data));

    // To clear the inputs after adding a TODO
    if (todoTitle === "" && todoDescription === "") {
      setTodoTitle(null);
      setTodoDescription(null);
    } else {
      setTodoTitle("");
      setTodoDescription("");
    }
  };

  return (
    <div className={styles.add_Task_Container}>
        <Button
          variant="contained"
          size="large"
          endIcon={
            dislayTaskForm ? (
              <ArrowUpwardOutlinedIcon />
            ) : (
              <ArrowDownwardOutlinedIcon />
            )
          }
          style={{ marginBottom: "1em" }}
          onClick={() => setDislayTaskForm((prev) => !prev)}
        >
          Add TODO
        </Button>
      {dislayTaskForm && (
        <TaskForm
          onSubmit={onSubmit}
          buttonName="Add"
          title={todoTitle}
          description={todoDescription}
        />
      )}
    </div>
  );
}

export default AddTask;
