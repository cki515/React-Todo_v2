import { Button, TextField } from "@mui/material";
import useTodosState from "../hooks/useTodosState";
import useNoticeSnackbarState from "../hooks/useNoticeSnackbarState";

export default function WriteyPage() {
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    form.content.value = form.content.value.trim();

    if (form.performDate.value.length === 0) {
      alert("Please Select Date");
      form.performDate.focus();
      return;
    }
    if (form.content.value.length === 0) {
      alert("Please Enter Todo");
      form.content.focus();
      return;
    }

    const todoId = todosState.addTodo(
      form.performDate.value,
      form.content.value
    );
    noticeSnackbarState.openBar(`ADD Todo List No : ${todoId}`);
    form.content.value = "";
    form.content.focus();
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex-1 flex flex-col gap-5 p-6 sm:p-8"
      >
        <TextField
          name="performDate"
          label="When should I do it?"
          focused
          type="datetime-local"
        />
        <TextField
          name="content"
          className="flex-1"
          label="What should I do?"
          InputProps={{ className: "flex-1 flex-col" }}
          multiline
        />
        <Button type="submit" variant="contained">
          <i className="fa-solid fa-marker"></i>
          <span>&nbsp;</span>
          <span>Add Todo</span>
        </Button>
      </form>
    </>
  );
}
