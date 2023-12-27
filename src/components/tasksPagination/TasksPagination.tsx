
import {Tasks} from "../../types/types"

import Pagination from "@mui/material/Pagination";

type TasksPaginationProps = {
  tasks: Tasks[];
  itemsPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function TasksPagination({tasks, itemsPerPage, page, setPage}: TasksPaginationProps) {

  const handlePagination = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };


  const paginationPages = Math.ceil(tasks.length / itemsPerPage);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        count={paginationPages}
        variant="outlined"
        color="primary"
        page={page}
        onChange={handlePagination}
      />
    </div>
  );
}

export default TasksPagination;
