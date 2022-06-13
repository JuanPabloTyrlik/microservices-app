import { createTheme, ThemeProvider } from "@mui/material";
import TableComponent from "./components/table/TableComponent";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <TableComponent />
    </ThemeProvider>
  );
}

export default App;
