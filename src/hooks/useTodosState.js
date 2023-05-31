import { useRef } from "react";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import { lastTodoNoAtom, todosAtom } from "../state/todo";
import { dateToStr } from "../state/util";

export default function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [lastTodoNo, setLastTodoNo] = useRecoilState(lastTodoNoAtom);
  const todoNoRef = useRef(lastTodoNo);

  todoNoRef.current = lastTodoNo;

  const addTodo = (performDate, newContent) => {
    const no = ++todoNoRef.current;
    setLastTodoNo(no);

    const newTodo = {
      no: no,
      regDate: dateToStr(new Date()),
      performDate: dateToStr(new Date(performDate)),
      content: newContent,
      completed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    return no;
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index !== index);
    setTodos(newTodos);
  };

  const removeTodoByNo = (no) => {
    const index = findTodoIndexByNo(no);
    removeTodo(index);
  };

  const modifyTodo = (index, performDate, content) => {
    const newTodos = produce(todos, (draft) => {
      draft[index].performDate = dateToStr(new Date(performDate));
      draft[index].content = content;
    });
    setTodos(newTodos);
  };

  const modifyTodoByNo = (no, performDate, newContent) => {
    const index = findTodoIndexByNo(no);
    modifyTodo(index, performDate, newContent);
  };

  const toggleTodoCompletedByNo = (no) => {
    const index = findTodoIndexByNo(no);
    setTodos(
      produce(todos, (draft) => {
        draft[index].completed = !draft[index].completed;
      })
    );
  };

  const findTodoIndexByNo = (no) => {
    return todos.findIndex((todo) => todo.no == no);
  };

  const findTodoByNo = (no) => {
    const index = findTodoIndexByNo(no);
    return todos[index];
  };

  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
    removeTodoByNo,
    findTodoByNo,
    modifyTodoByNo,
    toggleTodoCompletedByNo,
  };
}
