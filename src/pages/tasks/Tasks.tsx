import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import AddTask from "../../components/addTask/AddTask";
import CurrentTasksList from "../../components/currentTasksList/CurrentTasksList";

function Tasks() {
  const archivedTasks = useSelector(
    (state: RootState) => state.archivedTasks.value
  );

  return (
    <div>
      <Badge
        badgeContent={archivedTasks.length}
        color="warning"
        style={{ marginBottom: "1em", position: "absolute", right: "7em" }}
      >
        <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
          <Link
            to="/archives"
            style={{ textDecoration: "none", color: "white" }}
          >
            Archived TODOs
          </Link>
        </Button>
      </Badge>
      <AddTask />
      <CurrentTasksList />
    </div>
  );
}

export default Tasks;
