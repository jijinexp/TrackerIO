import React, {useState} from 'react';
import axios, {AxiosResponse, CancelTokenSource} from 'axios';
import {tokens} from '../theme';
import {useTheme} from '@mui/material';
import {
    Typography,
    Box,
    Button,
    Input,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
} from '@mui/material';
import {makeStyles} from "@material-ui/core";
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material';
import CsvParserService from "../services/CsvParserService";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column', // To make sure Paper expands vertically
        alignItems: 'center', // Center the content horizontally
        width: '100%',
    },
    paperContainer: {
        width: '100%', // Set the width to 100% for full-width inheritance
        marginBottom: theme.spacing(3), // Add spacing between Paper and grid
    },
    paper: {
        padding: theme.spacing(3),
        width: '100%', // Adjust the width as needed
        overflowX: 'auto', // Enable horizontal scrolling if needed
        position: 'relative',
    },
    browseButton: {
        margin: theme.spacing(2, 0), // Add margin for spacing
    },
    fileNameText: {
        marginLeft: theme.spacing(1), // Add spacing between button and file name
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    rightButtons: {
        marginLeft: 'auto', // Push the buttons to the right
    },
    showContentsButton: {
        width: '100%', // Set the button width to match Paper's width
    },
}));

interface CsvFileUploadProps {
    onCsvDataLoaded: (data: Array<Record<string, any>>) => void;
}

const CsvFileUpload: React.FC<CsvFileUploadProps> = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedFileCsvData, setFileData] = useState<Array<Record<string, any>>>([]);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [uploadCanceled, setUploadCanceled] = useState<boolean>(false); // Track upload cancellation
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    let cancelTokenSource: CancelTokenSource;
    // Handle file selection
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files?.[0];
            if (file) {
                try {
                    // Reset uploadCanceled when a new file is selected
                    setUploadCanceled(false);

                    let csvData = await CsvParserService.parseToCsv(file);
                    setFileData(csvData);
                    setErrorMessage('');
                } catch (error) {
                    setErrorMessage('Error parsing CSV file.');
                    console.error(error);
                }
            }
            setSelectedFile(event.target.files[0]);
        }
    };

    // Handle file upload
    const handleFileUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            cancelTokenSource = axios.CancelToken.source();

            axios.put('http://localhost:5251/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                cancelToken: cancelTokenSource.token
            })
                .then((response: AxiosResponse) => {
                    setSelectedFile(null); // Clear the selected file after successful upload
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        console.log('Request cancelled:', error.message);
                    } else {
                        console.error('Error uploading file:', error);
                    }
                }).finally(() => {
            });
        }
    };

    const handleFileCancel = () => {
        setUploadCanceled(true);
        setSelectedFile(null);
        setFileData([]);
        setIsCollapsed(true);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };


    const columns = selectedFileCsvData.length > 0 ? Object.keys(selectedFileCsvData[0]) : [];

    return (
        <div className={classes.root}>
            <Grid container className={classes.paperContainer}>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{padding: '16px'}} className={classes.paper}>
                        <div className={classes.buttonContainer}>
                            <Input
                                type="file"
                                onChange={handleFileSelect}
                                id="file-upload-input" // Add an ID for the file input
                                style={{display: 'none'}} // Hide the file input

                            />
                            <label htmlFor="file-upload-input">
                                <Button
                                    component="span" // Make the label act as a button
                                    variant="contained"
                                    size="large"
                                    className={classes.buttonContainer}
                                    sx={{
                                        backgroundColor: colours.BlueAccent.CT700,
                                        color: colours.Grey.CT100,
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                    }}
                                >
                                    <Typography variant="h3">
                                        Browse
                                    </Typography>
                                </Button>
                            </label>
                            {errorMessage && <p>{errorMessage}</p>}
                            <span className={classes.fileNameText}>
                            <Typography variant="h3" color={colours.Grey.CT100}>
                                 {selectedFile ? `File: ${selectedFile.name}` : 'No file selected'}
                            </Typography>
                        </span> {/* Display selected file name */}
                            <Box className={classes.rightButtons}>
                                <Button
                                    variant="contained"
                                    onClick={handleFileCancel}
                                    disabled={!selectedFile}
                                    sx={{
                                        backgroundColor: colours.BlueAccent.CT700,
                                        color: colours.Grey.CT100,
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                    }}
                                >
                                    <Typography variant="h3">
                                        Cancel
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    disabled={!selectedFile} /* Disable the button when upload is canceled */
                                    onClick={handleFileUpload}
                                    style={{marginLeft: '8px'}}
                                    sx={{
                                        backgroundColor: colours.BlueAccent.CT700,
                                        color: colours.Grey.CT100,
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                    }}
                                >
                                    <Typography variant="h3">
                                        Upload
                                    </Typography>
                                </Button>
                            </Box>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{
                        backgroundColor: colours.Primary.CT400,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'auto',
                        height: 375,
                    }}
                           elevation={3} className={classes.paper}>
                        <TableContainer style={{overflow: 'auto'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column}>{column}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedFileCsvData.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {columns.map((column) => (
                                                <TableCell key={column}>{row[column]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
export default CsvFileUpload;