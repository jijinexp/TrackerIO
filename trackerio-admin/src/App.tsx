import { useState } from "react";
import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, Theme, ThemeProvider} from "@mui/material";
import TopBar from "./scenes/global/TopBar";

function App() {
  const [theme, colourMode] = useMode();
  return (<ColorModeContext.Provider value={colourMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <main className="content">
          <TopBar/>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
