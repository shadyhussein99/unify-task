import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Tasks } from "../../types/types";

import SingleTask from "../../components/singleTask/SingleTask";
import TasksPagination from "../../components/tasksPagination/TasksPagination";

function Archives() {
  const archivedTasks = useSelector(
    (state: RootState) => state.archivedTasks.value
  );

  const currentTasks = useSelector(
    (state: RootState) => state.currentTasks.value
  );

  // For Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = archivedTasks.slice(startIndex, endIndex);

  return (
    <div>
      <Badge
        badgeContent={currentTasks.length}
        color="warning"
        style={{ marginBottom: "1em", position: "absolute", left: "7em" }}
      >
        <Button variant="contained" size="large" startIcon={<ArrowBackIcon />}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Current TODOs
          </Link>
        </Button>
      </Badge>

      <Typography
        variant="h5"
        style={{ textAlign: "center", marginBlock: "1em" }}
      >
        Archived TODOs
      </Typography>

      {archivedTasks.length > 0 ? (
        <>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBlock: "3em",
            }}
          >
            {paginatedTasks.map((task: Tasks, index) => {
              return (
                <SingleTask
                  task={task}
                  index={index}
                  status="archived"
                  key={index}
                />
              );
            })}
          </Grid>

          <TasksPagination
            tasks={archivedTasks}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          />
        </>
      ) : (
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          No Archived TODOs
        </Typography>
      )}
    </div>
  );
}

export default Archives;
