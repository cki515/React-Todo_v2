import { Button, TextField } from "@mui/material";
import useNoticeSnackbarState from "../hooks/useNoticeSnackbarState";
import useTodosState from "../hooks/useTodosState";
import { useNavigate, useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();
  const todo = todosState.findTodoById(id);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    form.content.value = form.content.value.trim();

    if (form.performDate.value.length == 0) {
      alert("Plase Select Date");
      form.performDate.focus();
      return;
    }
    if (form.content.value.length == 0) {
      alert("Plase Enter Todo");
      form.content.focus();
      return;
    }

    todosState.modifyTodoById(
      todo.id,
      form.performDate.value,
      form.content.value
    );
    noticeSnackbarState.openBar(`Edit Todo List No : ${todo.id}`, "info");
    navigate(-1);
  };
  return (
    <>
      <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-5 p-10">
        <TextField
          name="performDate"
          label="When should I do it?"
          focused
          type="datetime-local"
          defaultValue={todo.performDate}
        />
        <TextField
          name="content"
          className="flex-1"
          label="What should I do?"
          InputProps={{ className: "flex-1 flex-col" }}
          multiline
          defaultValue={todo.content}
        />
        <Button type="submit" variant="contained">
          <i className="fa-solid fa-marker"></i>
          <span>&nbsp;</span>
          <span>No : {todo.id} Edit Todo</span>
        </Button>
      </form>
    </>
  );
}
