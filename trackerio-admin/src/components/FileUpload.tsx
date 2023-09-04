import React, { useState } from 'react';
import axios, {AxiosProgressEvent, AxiosResponse, CancelTokenSource} from 'axios';
import { tokens } from '../theme';
import {Grid, Input , Button, Typography, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    let cancelTokenSource: CancelTokenSource;
    // Handle file selection
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setUploadStatus('');
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
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    const total = progressEvent.total ?? 0;
                    const uploadPercentage = Math.round(
                        (progressEvent.loaded * 100) / total
                    );
                    setProgress(uploadPercentage);
                },
                cancelToken: cancelTokenSource.token
            })
                .then((response: AxiosResponse) => {
                    setUploadStatus(response.data);
                    setSelectedFile(null); // Clear the selected file after successful upload
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        setUploadStatus('File upload cancelled.');
                    } else {
                        console.error('Error uploading file:', error);
                        setUploadStatus('File upload failed.');
                    }
                }).finally(() => {
                setUploading(false);
            });
            setUploading(true);
        }
    };
    return (
        <div>
            <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                id="file-upload"
                onChange={handleFileSelect}
            />
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={15} sm={6}>
                    <Typography variant="body1">
                        {selectedFile ? `File: ${selectedFile.name}` : 'No file selected'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} spacing={5}>
                    <label htmlFor="file-upload">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                        >
                            Select File
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFileUpload}
                        disabled={!selectedFile}
                    >
                        Upload
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default FileUpload;