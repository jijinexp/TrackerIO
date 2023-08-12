import React, { useState } from 'react';
import '../../css/FileUpload.css'
import '../../css/Progress.css'
import axios, {AxiosProgressEvent, AxiosResponse, CancelTokenSource} from 'axios';

const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    let cancelTokenSource: CancelTokenSource;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setUploadStatus('');
        }
    };

    const handleUpload = () => {
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

    const cancelUpload = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel('File upload cancelled by user.');
        }
    };

    return (
        <div className="file-upload-container">
            <div className="file-input-group">
            <label htmlFor="fileInput" className="file-label">
                {selectedFile ? selectedFile.name : 'Select a File'}
            </label>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
            <input type="file"
                   id="fileInput"
                   className="file-input"
                   onChange={handleFileChange} />
            </div>
            <div className="upload-actions">
            <button className="upload-button" onClick={handleUpload} disabled={!selectedFile}>
                Upload
            </button>
            <button className="cancel-button" onClick={cancelUpload}>
                Cancel
            </button>
            </div>
            {uploading && (
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: progress + '%' }}></div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
