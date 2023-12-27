import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

import { Tasks } from "../../types/types";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import SingleTask from "../singleTask/SingleTask";
import TasksPagination from "../tasksPagination/TasksPagination";

function CurrentTasksList() {
  const currentTasks = useSelector(
    (state: RootState) => state.currentTasks.value
  );

  // For Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = currentTasks.slice(startIndex, endIndex);

  return (
    <main>
      {currentTasks.length > 0 ? (
        <>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "3em",
            }}
          >
            {paginatedTasks.map((task: Tasks, index) => {
              return (
                <SingleTask
                  task={task}
                  index={index}
                  status="current"
                  key={index}
                />
              );
            })}
          </Grid>

          <TasksPagination
            tasks={currentTasks}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          />
        </>
      ) : (
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          No Current TODOs
        </Typography>
      )}
    </main>
  );
}

export default CurrentTasksList;
