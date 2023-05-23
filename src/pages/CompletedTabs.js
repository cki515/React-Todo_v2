import { Tab, Tabs } from "@mui/material";
import { todoList_filterCompletedIndexAtom } from "../state/todo";
import { useRecoilState } from "recoil";

export default function CompletedTabs() {
  const [filterCompletedIndex, setFilterCompletedIndex] = useRecoilState(
    todoList_filterCompletedIndexAtom
  );

  return (
    <>
      <Tabs
        variant="fullWidth"
        value={filterCompletedIndex}
        onChange={(event, newValue) => setFilterCompletedIndex(newValue)}
      >
        <Tab
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-list-ul"></i>
              <span className="ml-2">ALL</span>
            </span>
          }
          value={0}
        />
        <Tab
          label={
            <span className="flex items-baseline">
              <i className="fa-regular fa-square"></i>
              <span className="ml-2">INCOMPLETE</span>
            </span>
          }
          value={1}
        />
        <Tab
          label={
            <span className="flex items-baseline">
              <i className="fa-regular fa-square-check"></i>
              <span className="ml-2">COMPLETION</span>
            </span>
          }
          value={2}
        />
      </Tabs>
    </>
  );
}
