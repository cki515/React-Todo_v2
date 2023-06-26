import { produce } from "immer";
import { useRecoilState } from "recoil";
import { todosAtom, todosIsLodingAtom } from "../state/todo";
import { dateToStr } from "../state/util";

export default function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [todosIsLoding, setTodosIsLoding] = useRecoilState(todosIsLodingAtom);

  const userProtocol = window.location.protocol;
  const userCode = window.location.hostname;
  const API_TODOS_URL = `${userProtocol}//${userCode}:4000/${userCode}/todos`;

  const reloadTodos = async () => {
    try {
      const data = await fetch(`${API_TODOS_URL}`);

      if (data.status >= 400 && data.status < 600) {
        throw new Error(data.msg);
      }
      const dataJson = await data.json();
      const newTodos = dataJson.data.map((todo) => ({
        no: todo.no,
        regDate: todo.reg_date,
        updateDate: todo.update_date,
        performDate: dateToStr(new Date(todo.perform_date)),
        content: todo.content,
        completed: todo.is_completed === 1,
      }));
      setTodos(newTodos);
      setTodosIsLoding(false);
    } catch (err) {
      alert(err.message);
      window.location.reload();
    }
  };

  const addTodo = async (performDate, newContent) => {
    try {
      const inserRs = await fetch(`${API_TODOS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          perform_date: dateToStr(new Date(performDate)),
          content: newContent,
          is_completed: 0,
        }),
      });

      const inserRsJson = await inserRs.json();
      const no = inserRsJson.data.no;

      const newTodo = {
        no: no,
        regDate: inserRsJson.data.reg_date,
        performDate: dateToStr(new Date(inserRsJson.data_perform_date)),
        content: inserRsJson.data.content,
        completed: inserRsJson.data.is_completed === 1,
      };

      setTodos((todos) => [newTodo, ...todos]);
      return no;
    } catch (err) {
      alert(err.message);
      window.location.reload();
    }
  };

  const removeTodo = async (index, no) => {
    try {
      const removeRs = await fetch(`${API_TODOS_URL}/${no}`, {
        method: "DELETE",
      });

      if (removeRs.status >= 400 && removeRs.status < 600) {
        throw new Error(removeRs.msg);
      }

      const newTodos = todos.filter((_, _index) => _index !== index);
      setTodos(newTodos);
    } catch (err) {
      alert(err.message);
      window.location.reload();
    }
  };

  const removeTodoByNo = (no) => {
    const index = findTodoIndexByNo(no);
    removeTodo(index, no);
  };

  const modifyTodo = async (index, no, performDate, newContent) => {
    try {
      const modifyRs = await fetch(`${API_TODOS_URL}/${no}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          perform_date: performDate,
          content: newContent,
        }),
      });

      if (modifyRs.status >= 400 && modifyRs.status < 600) {
        throw new Error(modifyRs.msg);
      }

      const newTodos = produce(todos, (draft) => {
        draft[index].performDate = dateToStr(new Date(performDate));
        draft[index].content = newContent;
      });
      setTodos(newTodos);
    } catch (err) {
      alert(err.message);
      window.location.reload();
    }
  };

  const modifyTodoByNo = (no, performDate, newContent) => {
    const index = findTodoIndexByNo(no);
    modifyTodo(index, no, performDate, newContent);
  };

  const toggleTodoCompletedByNo = async (no) => {
    const index = findTodoIndexByNo(no);

    try {
      const modifyRs = await fetch(`${API_TODOS_URL}/${no}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_completed: todos[index].completed ? 0 : 1,
        }),
      });

      if (modifyRs.status >= 400 && modifyRs.status < 600) {
        throw new Error(modifyRs.msg);
      }

      setTodos(
        produce(todos, (draft) => {
          draft[index].completed = !draft[index].completed;
        })
      );
    } catch (err) {
      alert(err.message);
      window.location.reload();
    }
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
    todosIsLoding,
    reloadTodos,
  };
}
