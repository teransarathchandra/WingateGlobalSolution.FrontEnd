import useFileUpload from "@app_hooks/useFileUpload";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const FileUploader = ({ uploadUrl, folderPath, onUploadSuccess, onUploadError }) => {
    const { file, handleFileChange, handleFileUpload, setFolderPath } = useFileUpload(uploadUrl, folderPath);
    const [uploadedFileName, setUploadedFileName] = useState(null);

    useEffect(() => {
        setFolderPath(folderPath);
    }, [folderPath, setFolderPath]);

    const uploadFile = async (file) => {
        try {
            const result = await handleFileUpload(file);
            setUploadedFileName(file.name);
            if (onUploadSuccess) {
                onUploadSuccess(result);
            }
        } catch (error) {
            setUploadedFileName(null);
            if (onUploadError) {
                onUploadError(error);
            }
        }
    };

    const onChange = async (event) => {
        handleFileChange(event); // First, update the file state
        if (file) {  // Check if the file is not null
            await uploadFile(file);  // Trigger upload after state update
        }
    };

    return (
        <>
            <Button
                variant="contained"
                component="label"
                color="primary"
                startIcon={<CloudUploadIcon />}
            >
                Upload File
                <input type="file" hidden onChange={onChange} />
            </Button>
            {uploadedFileName && (
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                    Uploaded File: {uploadedFileName}
                </Typography>
            )}
        </>
    );
};

export default FileUploader;