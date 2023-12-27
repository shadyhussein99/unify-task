import { useForm, SubmitHandler } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Tasks } from "../../types/types";

import styles from "./taskForm.module.css";
import { useEffect } from "react";

function TaskForm({
  onSubmit,
  buttonName,
  title,
  description,
}: {
  onSubmit: SubmitHandler<Tasks>;
  buttonName: string;
  title?: string | null;
  description?: string | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Tasks>();

  // Used to control the values od the inputs
  useEffect(() => {
    if (title && description) {
      setValue("title", title);
      setValue("description", description);
    } else {
      setValue("title", "");
      setValue("description", "");
    }
  }, [title, description, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={styles.form_Container}
    >
      <div className={styles.inputs_Container}>
        <div>
          <TextField
            {...register("title", { required: true })}
            label="Title"
            variant="filled"
            size="small"
            style={{ width: "300px" }}
          />
          {errors.title && (
            <Typography
              variant="caption"
              style={{ color: "red", marginTop: "0.3em" }}
              display="block"
            >
              * Title field is required
            </Typography>
          )}
        </div>

        <div>
          <TextField
            {...register("description", { required: true })}
            label="Description"
            variant="filled"
            size="small"
            multiline
            style={{ width: "300px" }}
          />
          {errors.description && (
            <Typography
              variant="caption"
              style={{ color: "red", marginTop: "0.3em" }}
              display="block"
            >
              * Description field is required
            </Typography>
          )}
        </div>
      </div>

      {/* <Grid
        // container
        // spacing={2}
          style={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={11} md={6}>
          {errors.title && (
            <Typography
              variant="caption"
              style={{ color: "red"}}
            >
              * Title field is required
            </Typography>
          )}
          </Grid>
          <Grid item xs={11} md={6}>
          {errors.description && (
            <Typography
              variant="caption"
              style={{ color: "red"}}
            >
              * Description field is required
            </Typography>
          )}
        </Grid>
      </Grid> */}
      <Button type="submit" variant="outlined" color="primary">
        {buttonName}
      </Button>
    </form>
  );
}

export default TaskForm;
