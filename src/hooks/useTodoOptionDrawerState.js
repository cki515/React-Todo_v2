import { useMemo, useState } from "react";

export default function useTodoOptionDrawerState() {
  const [todoNo, setTodoNo] = useState(null);
  const open = useMemo(() => todoNo !== null, [todoNo]);
  const close = () => setTodoNo(null);
  const openDrawer = (no) => setTodoNo(no);
  return {
    todoNo,
    open,
    close,
    openDrawer,
  };
}
