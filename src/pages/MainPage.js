import useTodosState from "../hooks/useTodosState";
import TodosEmpty from "./TodosEmpty";
import TodoList from "./TodoList";

export default function MainPage() {
  const todosState = useTodosState();
  const todosEmpty = todosState.todos.length === 0;
  if (todosEmpty) {
    return <TodosEmpty />;
  }
  return (
    <>
      <TodoList />
    </>
  );
}
