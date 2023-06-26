import React from "react";
import useNoticeSnackbarState from "../hooks/useNoticeSnackbarState";
import { Alert as MuiAlert, Snackbar } from "@mui/material";

export default function NoticeSnackbar() {
  const state = useNoticeSnackbarState();

  const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert {...props} ref={ref} variant="filled" />;
  });

  return (
    <>
      <Snackbar open={state.open} autoHideDuration={state.autoHideDuration} onClose={state.closeBar}>
        <Alert severity={state.severity}>{state.msg}</Alert>
      </Snackbar>
    </>
  );
}
