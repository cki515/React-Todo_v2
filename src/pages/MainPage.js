import { useEffect } from "react";
import useTodosState from "../hooks/useTodosState";
import TodoList from "./TodoList";
import TodosEmpty from "./TodosEmpty";
import TodosLoading from "./TodosLoading";

export default function MainPage() {
  const todosState = useTodosState();
  const todosEmpty = todosState.todos.length === 0;

  useEffect(() => {
    todosState.reloadTodos();
  }, []);

  if (todosState.todosIsLoding) {
    return <TodosLoading />;
  }

  if (todosEmpty) {
    return <TodosEmpty />;
  }

  return (
    <>
      <TodoList />
    </>
  );
}
