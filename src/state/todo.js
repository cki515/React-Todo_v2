import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: persistAtomTodos } = recoilPersist({
  key: "persistAtomTodos",
});
const { persistAtom: persistAtomLastTodoId } = recoilPersist({
  key: "persistAtomLastTodoId",
});
const { persistAtom: persistAtomCommon } = recoilPersist({
  key: "persistAtomCommon",
});

export const todosAtom = atom({
  key: "app/todosAtom",
  default: [],
  effects_UNSTABLE: [persistAtomTodos],
});

export const lastTodoNoAtom = atom({
  key: "app/lastTodoNoAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomLastTodoId],
});

export const noticeSnackbarInfoAtom = atom({
  key: "app/noticeSnackbarInfoAtom",
  default: {
    open: false,
    msg: "",
    severity: "",
    autoHideDuration: 0,
  },
});

export const todoList_filterCompletedIndexAtom = atom({
  key: "app/todoList_filterCompletedIndexAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon],
});

export const todoList__sortIndexAtom = atom({
  key: "app/todoList__sortIndexAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon],
});
