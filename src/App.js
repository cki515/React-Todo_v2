import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import EditPage from "./pages/EditPage";
import NoticeSnackbar from "./pages/NoticeSnackbar";

function App() {
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <NavLink to="/main" className="font-bold select-none self-stretch flex items-center text-2xl mr-auto">
            TodoList
          </NavLink>
          {location.pathname === "/main" && (
            <NavLink className="select-none self-stretch flex items-center text-xl" to="/write">
              Write
            </NavLink>
          )}
          {location.pathname !== "/main" && (
            <NavLink className="select-none self-stretch flex items-center text-xl" to="/main">
              Home
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NoticeSnackbar />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:no" element={<EditPage />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default App;
