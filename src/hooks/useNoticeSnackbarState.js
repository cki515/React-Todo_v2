import { useRecoilState } from "recoil";
import { noticeSnackbarInfoAtom } from "../state/todo";

export default function useNoticeSnackbarState() {
  const [noticeSnackbarInfo, setNoticeSnackbarInfo] = useRecoilState(
    noticeSnackbarInfoAtom
  );

  const { open, msg, severity, autoHideDuration } = noticeSnackbarInfo;

  const openBar = (msg, severity = "success", autoHideDuration = 6000) => {
    setNoticeSnackbarInfo({ open: true, msg, severity, autoHideDuration });
  };

  const closeBar = () => {
    setNoticeSnackbarInfo({ ...noticeSnackbarInfo, open: false });
  };

  return {
    open,
    openBar,
    closeBar,
    msg,
    severity,
    autoHideDuration,
  };
}
