import { useRecoilState, useRecoilValue } from "recoil";
import {
  todoList__sortIndexAtom,
  todoList_filterCompletedIndexAtom,
} from "../state/todo";
import useTodosState from "./useTodosState";

export default function useTabs() {
  const filterCompletedIndex = useRecoilValue(
    todoList_filterCompletedIndexAtom
  );

  const sortIndex = useRecoilValue(todoList__sortIndexAtom);
  // only need Value : const sortIndex = useRecoilValue(todoList__sortIndexAtom);
  // only need setValue : const setSortIndex = useSetRecoilState(todoList__sortIndexAtom);

  const todosState = useTodosState();

  // completed tabs
  const getfilteredTodos = (todos) => {
    if (filterCompletedIndex == 1)
      return todos.filter((todo) => !todo.completed);
    if (filterCompletedIndex == 2)
      return todos.filter((todo) => todo.completed);

    return todos;
  };

  // sorted tabs
  const filteredTodos = getfilteredTodos(todosState.todos);
  const getSortedTodos = () => {
    if (sortIndex == 0) {
      return [...filteredTodos].sort((a, b) => {
        if (a.performDate == b.performDate) return 0;
        return a.performDate > b.performDate ? 1 : -1;
      });
    } else if (sortIndex == 1) {
      return [...filteredTodos].sort((a, b) => {
        if (a.performDate == b.performDate) return 0;
        return a.performDate < b.performDate ? 1 : -1;
      });
    } else if (sortIndex == 2) {
      return [...filteredTodos].sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    }
    return filteredTodos;
  };

  return {
    filterCompletedIndex,
    getfilteredTodos,
    getSortedTodos,
  };
}
