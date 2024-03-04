import { createContext, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { green, red, yellow, lightBlue, grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

// Create a context
export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const theme = createTheme({
    palette: {
      primary: {
        main: grey[900]
      },
      secondary: {
        main: green[500],
      },
      error: {
        main: red[500],
      },
      warning: {
        main: yellow[500],
      },
      info: {
        main: lightBlue[500],
      },
      success: {
        main: green[500],
      },
      mode: themeMode, // themeMode is now correctly typed
    },
    // ... add more theme options as needed
  });

  return (
    <ThemeContext.Provider value={{ setThemeMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
