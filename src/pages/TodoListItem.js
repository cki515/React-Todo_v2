import { Button, Chip } from "@mui/material";
import useTodosState from "../hooks/useTodosState";

export default function TodoListItem({ todo, openDrawer }) {
  const todosState = useTodosState();

  return (
    <li key={todo.no} className="mt-6 sm:mt-8">
      <div className="flex gap-2">
        <Chip label={`No : ${todo.no}`} size="medium" color="secondary" variant="outlined" />
        <Chip label={`Time: ${todo.performDate.substr(2, 14)}`} size="medium" color="info" variant="outlined" />
      </div>
      <div className="flex mt-2 sm:mt-4 shadow rounded-[20px]">
        <Button
          onClick={() => todosState.toggleTodoCompletedByNo(todo.no)}
          className="flex-shrink-0 items-start !rounded-l-[20px]"
          color="inherit"
        >
          <span
            className={(todo.completed ? "text-[color:var(--mui-color-primary-main)]" : "text-[#dcdcdc]") + " text-4xl"}
          >
            <i className="fa-solid fa-check"></i>
          </span>
        </Button>
        <div className="w-[2px] bg-[#dcdcdc] mr-4 my-3"></div>
        <div className="flex-grow flex my-3 items-center whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)]">
          {todo.content}
        </div>
        <Button onClick={() => openDrawer(todo.no)} className="flex-shrink-0 !pt-2 !items-start !rounded-r-[20px]">
          <span className="text-[#dcdcdc] text-2xl h-[80px]">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </span>
        </Button>
      </div>
    </li>
  );
}
