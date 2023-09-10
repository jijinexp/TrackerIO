import * as React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import CsvFileUpload from "../../components/CsvFileUpload";
import {useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useState} from "react";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function UploadInformation() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [csvData, setCsvData] = useState<Array<Record<string, any>>>([]);

    const handleCsvDataLoaded = (data: Array<Record<string, any>>) => {
        setCsvData(data);
    };


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{display: 'flex'}}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth={false} sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={1}>
                            {/* Upload file */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        backgroundColor: colours.Primary.CT400,
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'auto',
                                        height: 500,
                                    }}
                                >
                                    <CsvFileUpload onCsvDataLoaded={handleCsvDataLoaded} />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{pt: 4}}/>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}