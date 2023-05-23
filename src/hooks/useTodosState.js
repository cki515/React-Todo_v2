import { useRef } from "react";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import { lastTodoIdAtom, todosAtom } from "../state/todo";
import { dateToStr } from "../state/util";

export default function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [lastTodoId, setLastTodoId] = useRecoilState(lastTodoIdAtom);
  const todoId = useRef(lastTodoId);
  todoId.current = lastTodoId;

  const addTodo = (performDate, newContent) => {
    const id = ++todoId.current;
    setLastTodoId(id);

    const newTodo = {
      id: id,
      regDate: dateToStr(new Date()),
      performDate: dateToStr(new Date(performDate)),
      content: newContent,
      completed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    return id;
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  const removeTodoById = (id) => {
    const index = findTodoIndexById(id);
    removeTodo(index);
  };

  const modifyTodo = (index, performDate, content) => {
    const newTodos = produce(todos, (draft) => {
      draft[index].performDate = dateToStr(new Date(performDate));
      draft[index].content = content;
    });
    setTodos(newTodos);
  };

  const modifyTodoById = (id, performDate, newContent) => {
    const index = findTodoIndexById(id);
    modifyTodo(index, performDate, newContent);
  };

  const toggleTodoCompletedById = (id) => {
    const index = findTodoIndexById(id);
    setTodos(
      produce(todos, (draft) => {
        draft[index].completed = !draft[index].completed;
      })
    );
  };

  const findTodoIndexById = (id) => {
    return todos.findIndex((todo) => todo.id == id);
  };

  const findTodoById = (id) => {
    const index = findTodoIndexById(id);
    return todos[index];
  };

  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
    removeTodoById,
    findTodoById,
    modifyTodoById,
    toggleTodoCompletedById,
  };
}
