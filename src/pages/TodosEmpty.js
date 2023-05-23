import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function TodosEmpty() {
  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <div className="grid gap-5">
          <span className="text-4xl">
            Enter&nbsp;
            <span className="text-[color:var(--mui-color-primary-main)]">
              TodoList
            </span>
          </span>
          <Button
            size="large"
            variant="contained"
            component={NavLink}
            to="/write"
          >
            Add Todo List
          </Button>
        </div>
      </div>
    </>
  );
}
