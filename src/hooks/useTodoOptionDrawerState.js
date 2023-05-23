import { useMemo, useState } from "react";

export default function useTodoOptionDrawerState() {
  const [todoId, setTodoId] = useState(null);
  const open = useMemo(() => todoId !== null, [todoId]);
  const close = () => setTodoId(null);
  const openDrawer = (id) => setTodoId(id);
  return {
    todoId,
    open,
    close,
    openDrawer,
  };
}
