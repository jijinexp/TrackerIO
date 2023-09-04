import {ColorModeContext, useMode} from "./theme";
import { Routes, Route } from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./scenes/global/TopBar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Transactions from "./scenes/transactions";
import UploadInformation from "./scenes/uploadinformation";

function App() {
    const [theme, colourMode] = useMode();
    return (<ColorModeContext.Provider value={colourMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <Sidebar />
                    <main className="content">
                        <TopBar/>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/transactions" element={<Transactions />} />
                            <Route path="/uploadinformation" element={<UploadInformation />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
