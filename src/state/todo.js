import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: persistAtomCommon } = recoilPersist({
  key: "persistAtomCommon",
});

export const todosAtom = atom({
  key: "app/todosAtom",
  default: [],
});

export const todosIsLodingAtom = atom({
  key: "app/todosIsLodingAtom",
  default: true,
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
