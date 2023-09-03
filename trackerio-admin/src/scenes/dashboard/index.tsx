import {Box, Button, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";

const Dashboard = () => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colours.BlueAccent.CT700,
                            color: colours.Grey.CT100,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{mr: "10px"}}/>
                        Download Reports
                    </Button>
                </Box>
            </Box>


        </Box>
    );
};

export default Dashboard;