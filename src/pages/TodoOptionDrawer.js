import { Divider, List, ListItem, SwipeableDrawer } from "@mui/material";
import useNoticeSnackbarState from "../hooks/useNoticeSnackbarState";
import useTodosState from "../hooks/useTodosState";
import { NavLink } from "react-router-dom";

export default function TodoOptionDrawer({ state }) {
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

  const removeTodo = () => {
    if (window.confirm(`No : ${state.todoId} Delete it?`) == false) {
      state.close();
      return;
    }
    todosState.removeTodoById(state.todoId);
    state.close();
    noticeSnackbarState.openBar(`Delete Todo No : ${state.todoId}`, "info");
  };

  const todo = todosState.findTodoById(state.todoId);

  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        open={state.open}
        onClose={state.close}
      >
        <List className="!py-0">
          <ListItem className="!pt-6 !p-5">
            No : {todo?.id} Option Drawer
          </ListItem>
          <Divider />
          <ListItem
            className="!pt-6 !p-5 !items-baseline"
            button
            component={NavLink}
            to={`/edit/${todo?.id}`}
          >
            <i className="fa-solid fa-pen-to-square"></i>&nbsp;Update
          </ListItem>
          <ListItem
            className="!pt-6 !p-5 !items-baseline"
            button
            onClick={removeTodo}
          >
            <i className="fa-solid fa-trash-can"></i>&nbsp;Delete
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
}
