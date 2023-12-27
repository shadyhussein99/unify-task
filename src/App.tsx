import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";

import Header from "./components/header/Header";
import Tasks from "./pages/tasks/Tasks";
import Archives from "./pages/archives/Archives";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const theme = useSelector((state: RootState) => state.theme.value);

  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
    },
  });


  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />

        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/archives" element={<Archives />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
