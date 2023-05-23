import TodoListItem from "./TodoListItem";
import TodoOptionDrawer from "./TodoOptionDrawer";
import useTodoOptionDrawerState from "../hooks/useTodoOptionDrawerState";
import CompletedTabs from "./CompletedTabs";
import SortedTabs from "./SortedTabs";
import useTabs from "../hooks/useTabs";

export default function TodoList() {
  const getUseTabs = useTabs();
  const todoOptionDrawerState = useTodoOptionDrawerState();
  const sortTodos = getUseTabs.getSortedTodos();

  return (
    <>
      <TodoOptionDrawer state={todoOptionDrawerState} />
      <CompletedTabs />
      <SortedTabs />
      <div>
        <ul className="px-6 sm:px-8 pb-6 sm:pb-8">
          {sortTodos.map((el, index) => (
            <TodoListItem
              key={el.id}
              todo={el}
              openDrawer={todoOptionDrawerState.openDrawer}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
